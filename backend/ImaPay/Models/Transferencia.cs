namespace System.Models
{
    public class Transferencia
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int DestinatarioId { get; set; }
        public decimal Valor { get; set; }
        public string AgenciaDestino { get; set; }
        public string ContaDestino { get; set; }
        public string CpfCnpjDestino { get; set; }
        public DateTime Data { get; set; }
    }
}
