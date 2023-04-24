using System.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.Dtos;
using System.Implementacoes.InterManage;
using System.Interface;
using System.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace System.Implementacoes.ReposiManage
{
    public class ImaPayService : IImaPayService
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        private readonly ITransferenciaRepositorio _transferenciaRepositorio;
        private readonly IConfiguration _config;

        public ImaPayService(IUsuarioRepositorio usuarioRepositorio, ITransferenciaRepositorio transferenciaRepositorio, IConfiguration config)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _transferenciaRepositorio = transferenciaRepositorio;
            _config = config;
        }

        public async Task<Usuario> RegisterUserAsync(UsuarioEnderecoDTO dto)
        {
            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Sobrenome = dto.Sobrenome,
                Email = dto.Email,
                Senha = HashPassword(dto.Senha),
                Cpf = dto.Cpf,
                Conta = dto.Conta,
            };

            var Endereco = new Endereco
            {
                Rua = dto.Rua,
                Numero = dto.Numero,
                Bairro = dto.Bairro,
                Cidade = dto.Cidade,
                Estado = dto.Estado,
                Cep = dto.Cep
            };

            await _usuarioRepositorio.CreateUsuarioAsync(usuario);

            Endereco.UsuarioId = usuario.Id;

            await _usuarioRepositorio.CreateEndderecoAsync(Endereco);

            return usuario;
        }


        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var hashedBytes = sha256.ComputeHash(passwordBytes);
            return Convert.ToBase64String(hashedBytes);
        }



        public async Task<Usuario> GetUserByIdAsync(int id)
        {
            return await _usuarioRepositorio.GetByIdAsync(id);
        }

        public async Task<Usuario> GetUserByEmailAsync(string email)
        {
            return await _usuarioRepositorio.GetByEmailAsync(email);
        }

        public async Task CreateTransferAsync(TransferenciaDTO transferenciaUsuario)
        {
            var dto = new TransferenciaDTO
            {
                UsuarioId = transferenciaUsuario.UsuarioId,
                ContaDestino = transferenciaUsuario.ContaDestino,
                Valor = transferenciaUsuario.Valor,
            };

            var usuario = new UsuarioEnderecoDTO
            {
                Senha = transferenciaUsuario.Senha,
            };

            if (dto.Valor <= 0 || string.IsNullOrWhiteSpace(dto.ContaDestino))
            {
                throw new ArgumentException("Valor e conta de destino são campos obrigatórios");
            }

            var remetente = await _usuarioRepositorio.GetByIdAsync(dto.UsuarioId);
            if (remetente == null)
            {
                throw new ArgumentException("Usuário remetente não encontrado");
            }

            if (HashPassword(usuario.Senha) != remetente.Senha)
            {
                throw new ArgumentException("Senha incorreta");
            }

            if (remetente.Saldo < dto.Valor)
            {
                throw new ArgumentException("Saldo insuficiente");
            }
            var destinatario = await _usuarioRepositorio.GetByContaAsync(dto.ContaDestino);
            if (destinatario == null)
            {
                throw new ArgumentException("Usuário destinatário não encontrado");
            }

            var transferencia = new Transferencia
            {
                UsuarioId = dto.UsuarioId,
                DestinatarioId = destinatario.Id,
                Valor = dto.Valor,
                Data = DateTime.UtcNow
            };

            remetente.Saldo -= dto.Valor;
            destinatario.Saldo += dto.Valor;

            await _transferenciaRepositorio.CreateTransferAndUpdateBalancesAsync(transferencia, remetente, destinatario);
        }


        public async Task<IEnumerable<Transferencia>> GetHistoricoTransferenciasAsync(int usuarioId)
        {
            return await _transferenciaRepositorio.GetHistoricoTransferenciasAsync(usuarioId);
        }

        public async Task<bool> DeleteUsuarioAsync(int id)
        {
            var usuario = await _usuarioRepositorio.GetByIdAsync(id);
            if (usuario == null)
            {
                return false;
            }

            await _usuarioRepositorio.DeleteUsuarioAsync(id);
            return true;
        }


        public async Task<string> LoginAsync(UsuarioLoginDTO login)
        {
            var usuario = await _imaPayService.Usuario.FirstOrDefaultAsync(usuario => usuario.CPF == login.CPF);
            var usuarioNaoCadastrado = (usuario == null);
            var mensagemDeErro = StatusCode(
                statusCode: (int)HttpStatusCode.BadRequest,
                value: new
                {
                    Message = $"Usuário ou Senha incorreto.",
                    Moment = DateTime.Now
                });

            if (usuarioNaoCadastrado) return mensagemDeErro;

            var senhaIncorreta = !BCrypt.Net.BCrypt.Verify(login.Senha, usuario.Senha);

            if (senhaIncorreta) return mensagemDeErro;

            var token = ConfigurarToken.GerarToken(usuario);

            return Ok(new { token });
        }
    }

    }



