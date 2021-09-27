using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Interfaces
{
    public interface IEventoPersist
    {
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantres = false);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantres = false);
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantres = false);
    }
}