namespace System.Dtos
{
    public class TransferenciaDTO
    {
        public decimal Valor { get; set; }
        public string AgenciaDestino { get; set; }
        public string ContaDestino { get; set; }
        public string CpfCnpjDestino { get; set; }
        public int UsuarioId {get; set;}
        public string Senha { get; set; }
    }
}
