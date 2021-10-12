using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Interfaces;

namespace ProEventos.Persistence
{
    public class EventoPersist : IEventoPersist
    {
        private readonly ProEventosContext _contextEvento;
        public EventoPersist(ProEventosContext contextEvento)
        {
            _contextEvento = contextEvento;
            //_contextEvento.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //NoTracking

        }
        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantres = false)
        {
            IQueryable<Evento> query = _contextEvento.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);
            if (includePalestrantres)
            {
                query = query
                    .Include(e => e.PalestranteEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }
            query = query.OrderBy(e => e.Id)
                .Where(e => e.Id == eventoId);
            return await query.AsNoTracking().FirstOrDefaultAsync(); //NoTracking
        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantres = false)
        {
            IQueryable<Evento> query = _contextEvento.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);
            if (includePalestrantres)
            {
                query = query
                    .Include(e => e.PalestranteEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }
            query = query.OrderBy(e => e.Id);
            return await query.ToArrayAsync(); //NoTracking
        }
        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantres = false)
        {
            IQueryable<Evento> query = _contextEvento.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);
            if (includePalestrantres)
            {
                query = query
                    .Include(e => e.PalestranteEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }
            query = query.AsNoTracking().OrderBy(e => e.Id) //NoTracking
                .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}