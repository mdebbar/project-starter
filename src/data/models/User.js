import DataType from 'sequelize'
import Model from 'data/sequelize'

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
  },

  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
})

User.associate = models => {
  User.hasMany(models.Post, { as: 'posts' })
  User.hasMany(models.Comment, { as: 'comments' })
}

export default User
