import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-eventos-detalhe',
  templateUrl: './eventos-detalhe.component.html',
  styleUrls: ['./eventos-detalhe.component.scss']
})
export class EventosDetalheComponent implements OnInit {

  evento =  {} as Evento;
  estadoSalvar = 'postEvento';
  locale = 'pt-br';
  form!: FormGroup;

  get f(): any{
    return this.form.controls;
  }
  get bsConfig(): any{
    return { isAnimated: true,
      adaptivePosition: true,
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY hh:mm',
      containerClass: 'theme-default'};
  }
  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
    this.localeService.use(this.locale);
    }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null){
      this.spinner.show();
      this.estadoSalvar = 'putEvento';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.spinner.hide();
          this.evento = {...evento};
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar Evento.', 'Erro!');
          console.error(error);
        },
        () => {}
      );
    }
  }

  public validation(): void{
    this.form = this.fb.group({
      tema: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30)
        ]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['',
        [
          Validators.required,
          Validators.max(20000)
        ]],
      imagemURL: [''],
      email: ['',
      [
        Validators.required,
        Validators.email
      ]],
      telefone: ['', Validators.required]
    });
  }

  public cssValidatior(form: FormGroup): any{
    return { 'is-invalid': form.errors && form.touched };
  }

  public resetForm(): void {
    this.form.reset();
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.evento = (this.estadoSalvar === 'postEvento')
                  ? {...this.form.value}
                  : {id: this.evento.id, ...this.form.value};

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        () => { this.toastr.success('Evento salvo com sucesso.', 'Sucesso!'); },
        (error: any) => {
          console.log(error);
          this.toastr.error('Erro ao salvar evento.', 'Erro!');
        },
      ).add(() => this.spinner.hide());

    }
  }
}
