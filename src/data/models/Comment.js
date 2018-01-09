import DataType from 'sequelize'
import Model from '../sequelize'

const Comment = Model.define('Comment', {
  body: {
    type: DataType.TEXT,
  },
})

Comment.associate = models => {
  Comment.belongsTo(models.User, { as: 'user' })
  Comment.belongsTo(models.Post, { as: 'post' })
}

export default Comment
