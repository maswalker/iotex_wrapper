import _ from 'lodash';
import { Context } from 'koa';
import BaseController from '../base.controller';
import { apiService } from '@service/index';

class ApiController extends BaseController {

  public async root(ctx: Context) {
    console.log(ctx.request.body);

    const { id, method, params, jsonrpc } = ctx.request.body;
    const ret = { id, jsonrpc };
    let result;

    if (method == 'eth_chainId') {
      result = '0x3e8';
    } else if (method == 'eth_blockNumber') {
      result = 0;
    } else if (method == 'eth_getBlockByNumber') {

    } else if (method == 'eth_getBalance') {
      result = 0;
    }

    _.assign(ret, { result });
    return ret;
  }

}

export const apiController = new ApiController();

