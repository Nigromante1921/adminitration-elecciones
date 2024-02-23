import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ReportService} from "./core/report/report.service";
import {ToastService} from "ecapture-ng-ui";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "./core/auth/auth.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  public initializeBdVoting = true;
  public initializeBdPrecount = false;

  public isBlockPage: boolean = false;
  public user_id = '';

  private _subscription: Subscription = new Subscription();

  constructor(
    private _confirmationService: ConfirmationService,
    private _authService : AuthService,
    private _route: ActivatedRoute,
    private _messageService: ToastService,
    private _reportService : ReportService
  ) {
  }

  ngOnInit() {
    //this.verifyToken();
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public selectAction(action : string){


    if(action === 'preconteo' && !this.initializeBdPrecount){
      this.initializeBdPrecount = true;
      this.initializeBdVoting = false;
    }
    if(action === 'votacion' && !this.initializeBdVoting){
      this.initializeBdPrecount = false;
      this.initializeBdVoting = true;
    }

  }
  public confirmAction(){


    const messagge =  this.initializeBdPrecount?'Pre-conteo' : 'Votación'

    const confirmMesagge : string = 'Inicializar la base de datos ' + messagge

    this._confirmationService.confirm({
      message: '¿Esta seguro de realizar la acción?',
      header: confirmMesagge,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.initializeBdPrecount?this.initializeBdPrecountAction():this.initializeBdVotingAction()
      }
    });
  }
  public initializeBdVotingAction(){
    this.isBlockPage = true;
    const procedure = 'public.wf_inicializar_bd'
    this._subscription.add(
      this._reportService.getInfoReport(procedure, {
        password : '97f8aaf1-a6ab-48da-9cf1-a158d88ebfae',
        user_id: ''
      }).subscribe({
        next: (res  ) => {

          this.isBlockPage = false;
          if (res.error) {
            this.createMessageService('error', 'error al inicializar la base de datos', 5000)
            return
          }
          this.createMessageService('success', 'Se ha inicializado correctamente la base de datos', 5000)
        },
        error: (err) => {
          this.isBlockPage = false;
          this.createMessageService('error', 'No se pudo inicializar la base de datos', 1000)
        }
      })
    );
  }

  public initializeBdPrecountAction(){
    console.log('bdPreconteo')
  }

  private createMessageService(type: string, message: string, life : number): void {
    this._messageService.add({
      type,
      message,
      life: life
    })
  }
}
