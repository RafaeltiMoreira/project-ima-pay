using AutoMapper;
using ImaPay.Entity.Dtos;
using ImaPay.Entity.Models;
namespace UsuariosApi.Profiles
{
    public class UsuarioProfile : Profile
    {
        public UsuarioProfile()
        {
            CreateMap<UsuarioRegistroDTO, Usuario>();
        }
    }
}