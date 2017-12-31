import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

export default function createClient({ fetch, rehydration }) {
  return new ApolloClient({
    cache: new InMemoryCache().restore(rehydration),
    link: createHttpLink({ fetch }),
  })
}
