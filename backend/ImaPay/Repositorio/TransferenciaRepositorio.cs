using Microsoft.EntityFrameworkCore;
using System.Context;
using System.Interface;
using System.Models;

namespace System.Repositorio
{
    public class TransferenciaRepositorio : ITransferenciaRepositorio
    {
        private readonly SharpDB _context;

        public TransferenciaRepositorio(SharpDB context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transferencia>> GetByUsuarioIdAsync(int usuarioId)
        {
            return await _context.Transferencias.Where(t => t.UsuarioId == usuarioId).ToListAsync();
        }

        public async Task CreateAsync(Transferencia transferencia)
        {
            await _context.Transferencias.AddAsync(transferencia);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Transferencia>> GetHistoricoTransferenciasAsync(int usuarioId)
        {
            return await _context.Transferencias
                .Where(t => t.UsuarioId == usuarioId)
                .OrderByDescending(t => t.Data)
                .ToListAsync();
        }

        public async Task CreateTransferAndUpdateBalancesAsync(Transferencia transferencia, Usuario remetente, Usuario destinatario)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                _context.Transferencias.Add(transferencia);
                _context.Entry(remetente).State = EntityState.Modified;
                _context.Entry(destinatario).State = EntityState.Modified;

                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new InvalidOperationException("Erro ao criar a transferência", ex);
            }
        }


    }
}
