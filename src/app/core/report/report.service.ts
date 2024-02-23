import { Injectable } from '@angular/core';
import {GetInfoReportQuery} from "./report.query.service";
import {map, Observable} from "rxjs";
import {Response} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private getInfoReportQuery : GetInfoReportQuery) { }

  public getInfoReport(procedure: string, parameters: any): Observable<Response> {
    return this.getInfoReportQuery
      .watch({
        procedure: procedure,
        parameters: parameters,
      })
      .valueChanges.pipe(map(({ data }: any) => data.getInfoReport));
  }
}
