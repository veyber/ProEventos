import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { Lote } from '@app/models/Lote';
import { LoteService } from '@app/services/lote.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos-detalhe',
  templateUrl: './eventos-detalhe.component.html',
  styleUrls: ['./eventos-detalhe.component.scss']
})
export class EventosDetalheComponent implements OnInit {

  public modalRef: BsModalRef;
  evento =  {} as Evento;
  eventoId: number;
  loteAtual = {id: 0, nome: '', indice: 0};
  estadoSalvar = 'postEvento';
  locale = 'pt-br';
  form!: FormGroup;

  get modoEditar(): boolean{
    return this.estadoSalvar === 'putEvento';
  }
  get lotes(): FormArray{
    return (this.form.get('lotes') as FormArray);
  }
  get f(): any{
    return this.form.controls;
  }
  get bsConfig(): any{
    return {
      showWeekNumbers: false,
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm',
      containerClass: 'theme-default'};
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private eventoService: EventoService,
              private loteService: LoteService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private modalService: BsModalService) {
    this.localeService.use(this.locale);
    }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRoute.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0){
      this.spinner.show();
      this.estadoSalvar = 'putEvento';

      this.eventoService.getEventoById(this.eventoId).subscribe(
        (eventoRetorno: Evento) => {
          this.evento = {...eventoRetorno};
          this.form.patchValue(this.evento);
          this.evento.lotes.forEach(lote => { this.lotes.push(this.criarLote(lote)); }) ;
          // this.carregarLotes();
        },
        (error: any) => {
          this.toastr.error('Erro ao carregar Evento.', 'Erro!');
          console.error(error);
        }
      ).add(() => { this.spinner.hide(); } );
    }
  }

  // carregarLotes(): void{
  //   this.loteService.getLotesByEventoId(this.eventoId).subscribe(
  //     (lotesRetorno: Lote[]) => {
  //       lotesRetorno.forEach(lote => {this.lotes.push(this.criarLote(lote));});
  //     },
  //     (error: any) => {
  //       console.error(error);
  //       this.toastr.error('Erro ao carregar Lotes.', 'Erro!');
  //     }
  //   )
  // }

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
      telefone: ['', Validators.required],
      lotes: this.fb.array([])
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      preco: [lote.preco, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required]
    });
  }

  public cssValidator(form: FormGroup | AbstractControl): any{
    return { 'is-invalid': form.errors && form.touched };
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }
  public resetForm(): void {
    this.form.reset();
  }

  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.evento = (this.estadoSalvar === 'postEvento')
                  ? {...this.form.value}
                  : {id: this.evento.id, ...this.form.value};

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toastr.success('Evento salvo com sucesso.', 'Sucesso!');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Erro ao salvar evento.', 'Erro!');
        },
      ).add(() => {
        this.spinner.hide();
      });


    }
  }

  public salvarLotes(): void {
    if (this.lotes.valid){
      this.spinner.show();
      this.loteService.saveLote(this.eventoId, this.lotes.value).subscribe(
        (loteRetorno: Lote[]) => {
          this.toastr.success('Lotes salvos com sucesso.', 'Sucesso!');
          // this.lotes.reset();
          // this.carregarEvento();
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Erro ao salvar lotes.', 'Erro!');
        }
      ).add(() => this.spinner.hide());
    }
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe(
      () => {
        this.toastr.success('Lote excluido com sucesso.', 'Sucesso!');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar excluir o Lote ID: ${this.loteAtual.id}`, 'Erro!');
      },
    ).add(() => this.spinner.hide());

  }
  public declineDeleteLote(): void {
    this.modalRef.hide();
  }

}
