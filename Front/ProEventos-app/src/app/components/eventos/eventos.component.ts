import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
 // providers: [EventoService] //Ingeção
})
export class EventosComponent implements OnInit {
  public modalRef: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public larguraImg = 75;
  public margemImg = 2;
  public exibirImg = true;
  private filtroListado = '';

  public get filtroLista(): string{
    return this.filtroListado;
  }
  public set filtroLista(filtro: string){
    this.filtroListado = filtro;
    this.eventosFiltrados = this.filtroListado ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtro: string): Evento[]{
    filtro = filtro.toLowerCase();
    return this.eventos.filter(
      eventos => eventos.tema.toLowerCase().indexOf(filtro) !== -1 ||
      eventos.local.toLowerCase().indexOf(filtro) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.spinner.show();

    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventosResp: Evento[]) => {
        this.eventos = eventosResp,
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Eventos.', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
    // this.eventoService.getEventos().subscribe( //OUTRA OPÇÃO
    //   (eventosResp: Evento[]) => {
    //     this.eventos = eventosResp,
    //     this.eventosFiltrados = this.eventos;
    //   },
    //   error => console.log(error)
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  public confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento deletado com sucesso.', 'Deletado!');
  }
  public decline(): void {
    this.modalRef.hide();
  }
}
