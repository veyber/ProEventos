using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class PalestranteDto
    {
        [Required(ErrorMessage = "O campo {0} é obrigatorio.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio.")]
        public string MiniCurriculo { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio.")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio."),
         EmailAddress(ErrorMessage = "Email invalido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio.")]
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatorio.")]
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}