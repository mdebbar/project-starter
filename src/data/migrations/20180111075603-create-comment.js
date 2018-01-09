import { ID, TS, FK } from './helpers'

export async function up(queryInterface, DataType) {
  await queryInterface.createTable('Comment', {
    id: ID(DataType),
    createdAt: TS(DataType),
    updatedAt: TS(DataType),
    userId: FK(DataType, 'User'),
    postId: FK(DataType, 'Post'),

    body: {
      type: DataType.TEXT,
      allowNull: false,
    },
  })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Comment')
}
