import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.scss']
})
export class EventosListaComponent implements OnInit {
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
    private spinner: NgxSpinnerService,
    private router: Router
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
  }

  public openModal(templateDelete: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(templateDelete, {class: 'modal-sm'});
  }
  public confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento deletado com sucesso.', 'Deletado!');
    this.router.navigate([`eventos/lista`]);
  }
  public decline(): void {
    this.modalRef.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
}
