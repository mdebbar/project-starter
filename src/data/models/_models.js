import * as models from './index'

// Call `associate` on all models.
for (const name in models) {
  // eslint-disable-next-line import/namespace
  const model = models[name]
  if (model.associate) {
    model.associate(models)
  }
}

export * from './index'
