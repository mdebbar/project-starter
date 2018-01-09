import { ID, TS, FK } from './helpers'

export async function up(queryInterface, DataType) {
  await queryInterface.createTable('Post', {
    id: ID(DataType),
    createdAt: TS(DataType),
    updatedAt: TS(DataType),
    userId: FK(DataType, 'User'),

    body: {
      type: DataType.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Post')
}
