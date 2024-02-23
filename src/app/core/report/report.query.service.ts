import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query} from "apollo-angular";
import {DocumentNode} from "graphql/language";

@Injectable({
  providedIn: 'root',
})
export class GetInfoReportQuery extends Query<Response>{
  override document : DocumentNode = gql`
    query getInfoReport($procedure: String!, $parameters: Any) {
      getInfoReport(input: { data: { procedure: $procedure, parameters: $parameters } }) {
        error
        data
        type
        msg
      }
    }
  `;

}
