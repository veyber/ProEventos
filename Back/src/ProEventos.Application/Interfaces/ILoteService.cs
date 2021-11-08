using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Interfaces
{
    public interface ILoteService
    {
        Task AddLote(int eventoId, LoteDto model);
        Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models);
        Task<bool> DeleteLote(int eventoId, int loteId);
        Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoIde);
        Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteIde);
    }
}