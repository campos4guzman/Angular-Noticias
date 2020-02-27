import { Component, OnInit,Output,EventEmitter,Input,Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DetalleNot {
  tit: string;
  img: string;
  fec: string;
  des: string;
}


@Component({
  selector: 'app-dashboard-ejemp',
  templateUrl: './dashboard-ejemp.component.html',
  styleUrls: ['./dashboard-ejemp.component.css']
})
export class DashboardEjempComponent {

  noticias;
  busqueda='';
  evento1(){
    this.http.get("https://newsapi.org/v2/everything?q="+this.busqueda+"&language=es&sortBy=popularity&apiKey=2b06a2f181aa4bddb9b8e704a08673be").subscribe(
      resultado=>{
        this.noticias=resultado;
        this.noticias=this.noticias.articles;
        console.log(this.busqueda);
    });
  }
  detalle(titulo,imagen,fecha,descr): void {
    console.log(titulo,imagen,fecha,descr);
    const dialogRef = this.dialog.open(Modal, {
      data: {tit:titulo,img:imagen,fec:fecha.split("T"),des:descr}
    });
  }
  constructor(private breakpointObserver: BreakpointObserver, public http:HttpClient,public dialog: MatDialog) {}

}

  @Component({
    selector: 'modal',
    templateUrl: 'modal.html',
    styleUrls: ['./dashboard-ejemp.component.css']
  })
  export class Modal {
  
    constructor(
      public dialogRef: MatDialogRef<Modal>,
      @Inject(MAT_DIALOG_DATA) public data: DetalleNot) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

