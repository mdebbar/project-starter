import { ID, TS } from './helpers'

export async function up(queryInterface, DataType) {
  await queryInterface.createTable('User', {
    id: ID(DataType),
    createdAt: TS(DataType),
    updatedAt: TS(DataType),

    email: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    emailConfirmed: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('User')
}
