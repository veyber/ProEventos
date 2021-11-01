using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class RedeSocialDto
    {
        [Required(ErrorMessage = "Campo {0} é obrigatorio.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatorio.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatorio.")]
        public string URL { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatorio.")]
        public int? EventoId { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatorio.")]
        public EventoDto Evento { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatorio.")]
        public int? PalestranteId { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatorio.")]
        public PalestranteDto Palestrante { get; set; }
    }
}