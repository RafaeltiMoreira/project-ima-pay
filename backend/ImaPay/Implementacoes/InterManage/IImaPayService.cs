using System.Dtos;
using System.Models;

namespace System.Implementacoes.InterManage
{
    public interface IImaPayService
    {

        Task<Usuario> RegisterUserAsync(UsuarioEnderecoDTO dto);
        Task<Usuario> GetUserByIdAsync(int id);
        Task<Usuario> GetUserByEmailAsync(string email);
  
        Task<IEnumerable<Transferencia>> GetHistoricoTransferenciasAsync(int usuarioId);
        Task CreateTransferAsync(TransferenciaDTO transferenciaUsuario);

        Task<bool> DeleteUsuarioAsync(int id);
        Task<string> LoginAsync(UsuarioLoginDTO login);
      
    }
}
