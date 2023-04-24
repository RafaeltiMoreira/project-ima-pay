
using Microsoft.AspNetCore.Mvc;
using System.Dtos;
using System.Implementacoes.InterManage;


namespace System.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransferenciaController : ControllerBase
    {
        private readonly IImaPayService _imaPayService;

        public TransferenciaController(IImaPayService imaPayService)
        {
            _imaPayService = imaPayService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransferAsync(TransferenciaDTO transferenciaUsuario)
        {


            await _imaPayService.CreateTransferAsync(transferenciaUsuario);
            return Ok();
        }

        [HttpGet("historico/{usuarioId}")]
        public async Task<IActionResult> GetHistoricoTransferenciasAsync(int usuarioId)
        {
            var historico = await _imaPayService.GetHistoricoTransferenciasAsync(usuarioId);
            return Ok(historico);
        }
    }
}
