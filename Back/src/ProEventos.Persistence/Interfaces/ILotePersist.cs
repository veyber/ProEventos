using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Interfaces
{
    public interface ILotePersist
    {
        /// <summary>
        /// Método get que retorna uma lista de lotes por eventoId.
        /// </summary>
        /// <param name="eventoId">
        /// Código chave da tabela Evento.
        /// </param>
        /// <returns>Arrai de Lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);

        /// <summary>
        /// Método get que retorna um lote por eventoId e loteId.
        /// </summary>
        /// <param name="eventoId">
        /// Código chave da tabela Evento.
        /// /// <param name="loteId">
        /// Código chave da tabela Lote.
        /// </param>
        /// <returns>Apenas um Lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}