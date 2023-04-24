using System.Dtos;
using System.Models;

namespace System.Interface
{
    public interface IUsuarioRepositorio
    {


        Task<Usuario> GetByIdAsync(int id);
        Task<Usuario> GetByEmailAsync(string email);
        Task UpdateAsync(Usuario usuario);
        Task DeleteAsync(int id);
        Task CreateUsuarioAsync(Usuario usuario);
        Task CreateEndderecoAsync(Endereco endereco);

        Task<bool> DeleteUsuarioAsync(int id);
        Task<Usuario?> GetByContaAsync(string conta);

    }
}
