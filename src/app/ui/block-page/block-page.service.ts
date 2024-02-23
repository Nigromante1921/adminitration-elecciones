import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlockPageService {

  private blockPageSubject = new Subject<boolean>();

  public blockPageSource$ = this.blockPageSubject.asObservable();

  public setBlockPage(show: boolean) {
    this.blockPageSubject.next(show);
  }

  constructor() {

  }
}
