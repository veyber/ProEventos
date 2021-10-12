using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Interfaces;

namespace ProEventos.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly ProEventosContext _contextGeral;
        public GeralPersist(ProEventosContext contextGeral)
        {
            _contextGeral = contextGeral;
            _contextGeral.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //No Tracking

        }
        public void Add<T>(T entity) where T : class
        {
            this._contextGeral.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            this._contextGeral.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            this._contextGeral.Remove(entity);
        }
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            this._contextGeral.RemoveRange(entityArray);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _contextGeral.SaveChangesAsync()) > 0;
        }
    }
}