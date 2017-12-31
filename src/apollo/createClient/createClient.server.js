import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'

export default function createClient({ schema }) {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  })
}
