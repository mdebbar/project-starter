import DataType from 'sequelize'
import Model from '../sequelize'

const Post = Model.define('Post', {
  body: {
    type: DataType.TEXT,
  },
})

Post.associate = models => {
  Post.belongsTo(models.User)
}

export default Post
