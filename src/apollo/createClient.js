import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

export default function createClient({ fetch, ssrMode, rehydration }) {
  const cache = new InMemoryCache().restore(rehydration)
  return new ApolloClient({
    ssrMode,
    cache,
    link: createHttpLink({ fetch }),
  })
}
