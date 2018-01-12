// @flow
import React from 'react'

import type { ComponentType } from 'react'
import type { DocumentNode, OperationOption } from 'graphql'
import type { ConnectedProps } from './connect'

import connect from './connect'

export default function connectLoaded<TProps>(
  query: DocumentNode,
  Component: ComponentType<TProps & ConnectedProps>,
  config?: OperationOption = {},
): ComponentType<TProps & ConnectedProps> {
  // TODO: Think about enforcing a certain delay before switching from
  //       the loading state to the rendered state.
  function IntermediateComponent(props: TProps & ConnectedProps) {
    return isLoading(props) ? null : <Component {...props} />
  }
  return connect(query, IntermediateComponent, config)
}

function isLoading(props) {
  if (props.data && typeof props.data.loading === 'boolean') {
    return props.data.loading
  }
  if (typeof props.loading === 'boolean') {
    return props.loading
  }
  throw new Error('[connectLoaded] a `loading` prop was expected but not found')
}
