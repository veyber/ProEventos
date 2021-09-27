using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Interfaces
{
    public interface IEventoService
    {
        Task<Evento> AddEventos(Evento model);
        Task<Evento> UpdateEvento(int eventoId, Evento model);
        Task<bool> DeleteEvento(int eventoId);

        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantres = false);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantres = false);
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantres = false);
    }
}