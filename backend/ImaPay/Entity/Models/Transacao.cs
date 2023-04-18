namespace ImaPay.Entity.Models
{
    public class Transacao
    {

        public int Id { get; set; }
        public int RemetenteId { get; set; }
        public int DestinatarioId { get; set; }
        public double Valor { get; set; }
        public DateTime Data { get; set; }
        public Usuario Usuario { get; set; }
  
    }
}