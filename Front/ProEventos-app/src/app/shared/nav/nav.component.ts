import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public modalRef: BsModalRef;

  public isCollapsed = true;

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  public openModal(templateSair: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(templateSair, {class: 'modal-sm'});
  }
  public confirmSair(): void{
    this.modalRef.hide();
    this.toastr.success('Logout relizado com sucesso.', 'Volte sempre!');
    this.router.navigate([`user/login`]);
  }
  public declineSair(): void{
    this.modalRef.hide();
  }
  public showMenu(): boolean{
    return this.router.url !== '/user/login';
  }
  ngOnInit(): void {
  }

}
