using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        [Required(ErrorMessage = "{0} é obrigatorio.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "{0} é obrigatorio.")]
        public string Local { get; set; }

        [Display(Name = "Data do Evento"),
         Required(ErrorMessage = "{0} é obrigatorio."),
         Timestamp()]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "{0} é obrigatorio."),
        //  MinLength(3, ErrorMessage = "{0} de ter no minimo 4 caracteres."),
        //  MaxLength(30, ErrorMessage = "{0} de ter no maximo 30 caracteres."),
         StringLength(30, MinimumLength = 3,
                          ErrorMessage = "{0} deve ter entre 4 e 20 caracteres.")]
        public string Tema { get; set; }

        [Display(Name = "Quantidade de pessoas"),
         Range(1, 120000, ErrorMessage = "{0} deve ser entre 1 e 120000"),
         Required(ErrorMessage = "{0} é obrigatorio.")]
        public int QtdPessoas { get; set; }

        [Display(Name = "Imagem"),
         Required(ErrorMessage = "{0} é obrigatorio."),
         RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
                           ErrorMessage = "{0} é invalida.")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "{0} é obrigatorio."),
         Phone(ErrorMessage = "{0} é invalido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "{0} é obrigatorio."),
         EmailAddress(ErrorMessage = "Email invalido.")]
        public string Email { get; set; }


        public IEnumerable<LoteDto> Lotes { get; set; }

        [Display(Name = "Redes Sociais")]
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }


        public IEnumerable<PalestranteDto> PalestranteEventos { get; set; }



    }
}