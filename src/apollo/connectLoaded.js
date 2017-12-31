// @flow
import React from 'react'

import type { ComponentType } from 'react'
import type { DocumentNode, OperationOption } from 'graphql'
import type { ConnectedProps } from './connect'

import connect from './connect'

export default function connectLoaded<TProps>(
  query: DocumentNode,
  config: OperationOption,
  Component: ComponentType<TProps & ConnectedProps>,
): ComponentType<TProps & ConnectedProps> {
  function IntermediateComponent(props: TProps & ConnectedProps) {
    return isLoading(props) ? null : <Component {...props} />
  }
  return connect(query, config, IntermediateComponent)
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
