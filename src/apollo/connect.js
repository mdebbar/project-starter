// @flow
import { graphql } from 'react-apollo'

import type { ComponentType } from 'react'
import type { DocumentNode, OperationOption } from 'graphql'

export type ConnectedProps = {
  data?: { loading: boolean, [string]: any },
  loading?: boolean,
}

export default function connect<TProps>(
  query: DocumentNode,
  config: OperationOption,
  Component: ComponentType<TProps & ConnectedProps>,
): ComponentType<TProps & ConnectedProps> {
  return graphql(query, config)(Component)
}
