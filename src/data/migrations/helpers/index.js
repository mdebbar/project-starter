export const ID = DataType => ({
  type: DataType.INTEGER,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false,
})

// For timestamps e.g. `createdAt`
export const TS = DataType => ({
  type: DataType.DATE,
  allowNull: false,
})

// Foreign key.
export const FK = (DataType, toModel) => ({
  type: DataType.INTEGER,
  references: { model: toModel },
  allowNull: false,
  onDelete: 'cascade',
})
