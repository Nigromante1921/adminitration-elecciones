import {NgModule} from "@angular/core";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {onError} from "@apollo/client/link/error";
import {EnvServiceProvider} from "./core/env/env.service.provider";
import {ApolloClientOptions, ApolloLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {HttpHeaders} from "@angular/common/http";

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
const uri = EnvServiceProvider.useFactory().GRAPHQL_API + '/query';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    return sessionStorage.getItem('access-token')
      ? {headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('access-token')}`),}
      : {}
  });

  return {
    link: ApolloLink.from([
      errorLink,
      basic,
      auth,
      httpLink.create({uri})
    ]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
    queryDeduplication: false,
  };
}

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule{

}
