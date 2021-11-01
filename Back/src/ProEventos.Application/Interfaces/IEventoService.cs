using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Interfaces
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEvento(int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int eventoId);

        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantres = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantres = false);
        Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantres = false);
    }
}