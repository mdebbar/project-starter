/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize'
import dataloaderSequelize from 'dataloader-sequelize'
import config from '../config'

const sequelize = new Sequelize(config.sequelize)

// Batch sql queries using `dataloader`.
// https://github.com/mickhansen/dataloader-sequelize
dataloaderSequelize(sequelize)

export default sequelize
