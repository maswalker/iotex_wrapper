import Joi from 'joi';
import { Route } from '@common/interfaces';
import { RequestMethod } from '@common/enums';
import fieldReg from '@common/field_reg';
import { api } from '@controller/api';

const prefix = '';

const routes: Route[] = [
  {
    name: 'root',
    path: '/',
    method: RequestMethod.POST,
    action: api.apiController.root
  }
];

export default routes.map((item) => ({ ...item, path: `${prefix}${item.path}` }));
