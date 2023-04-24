using System.Models;

namespace System.Interface
{
    public interface ITransferenciaRepositorio
    {

        Task<IEnumerable<Transferencia>> GetByUsuarioIdAsync(int usuarioId);
        Task CreateAsync(Transferencia transferencia);

        Task<IEnumerable<Transferencia>> GetHistoricoTransferenciasAsync(int usuarioId);

        Task CreateTransferAndUpdateBalancesAsync(Transferencia transferencia, Usuario remetente, Usuario destinatario);

    }
}
