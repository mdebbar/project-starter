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
  Component: ComponentType<TProps & ConnectedProps>,
  config?: OperationOption = {},
): ComponentType<TProps & ConnectedProps> {
  return graphql(query, config)(Component)
}
