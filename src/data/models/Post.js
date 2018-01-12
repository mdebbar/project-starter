import DataType from 'sequelize'
import Model from 'data/sequelize'

const Post = Model.define('Post', {
  body: {
    type: DataType.TEXT,
  },
})

Post.associate = models => {
  Post.belongsTo(models.User, { as: 'user' })
  Post.hasMany(models.Comment, { as: 'comments' })
}

export default Post
