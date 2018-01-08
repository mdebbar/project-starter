/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize'
import config from '../config'

export default new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    ...config.db,
    define: {
      // http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-init
      freezeTableName: true,
    },
  },
)
