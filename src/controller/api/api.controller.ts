import _ from 'lodash';
import moment from 'moment';
//import Antenna from "iotex-antenna";
import { Context } from 'koa';
import BaseController from '../base.controller';

//const antenna = new Antenna("https://api.iotex.one");

class ApiController extends BaseController {

  public async root(ctx: Context) {
    console.log(ctx.request.body);

    const { id, method, params, jsonrpc } = ctx.request.body;
    const ret = { id, jsonrpc };
    let result;

    if (method == 'eth_chainId') {
      result = '0x3e8';
    } else if (method == 'eth_blockNumber') {
      result = await this.getBlockNumber();
    } else if (method == 'eth_getBlockByNumber') {
      result = await this.getBlockByNumber(params[0]);
    } else if (method == 'eth_getBalance') {
      result = await this.getBalance(params[0]);
    }

    _.assign(ret, { result });
    return ret;
  }

  public async getBlockNumber() {
    /*
    const ret = await antenna.iotx.getChainMeta({});
    return _.get(ret, 'chainMeta.height', 0);
    */
    return 9999;
  }

  public async getBalance(address: string) {
    /*
    const ret = await antenna.iotx.getAccount({ address });
    return _.get(ret, 'accountMeta.balance', 0);
    */
    return 88888000000;
  }

  public async getBlockByNumber(block_id: number) {
    /*
    const ret = await antenna.iotx.getBlockMetas({ byIndex: { start: block_id, count: 1 } });
    const { blkMetas, total } = ret;
    if (total == 0)
      return {};

    const b = blkMetas[0];
    return {
      number: b.height,
      hash: b.hash,
      parentHash: '',
      nonce: 0,
      sha3Uncles: '',
      logsBloom: '',
      transactionsRoot: b.txRoot,
      stateRoot: '',
      miner: b.producerAddress,
      difficulty: '',
      totalDifficulty: '',
      size: b.numActions,
      extraData: '0x',
      gasLimit: 10000,
      gasUsed: 1,
      timestamp: moment(b.timestamp).valueOf(),
      transactions: [],
      uncles: []
    };
    */

    return {
      number: 9999,
      hash: 'b7754977cae0f2a45a4ae2b7f0dfc20487e5acfa93594e5eaa1e93f5ec88800f',
      parentHash: 'N9XWktUXQo60gwwqV17n5trTKkbUp/Ob6UY841g+AtA=',
      nonce: 0,
      sha3Uncles: '',
      logsBloom: '',
      transactionsRoot: '5Pn9BOMAgzj0LX9o6AD8O/FbDueiA5eS+9MUMzQ6QwY=',
      stateRoot: '',
      miner: 'BB5cvAz6DM+BTzw9RADTmMqz0WPDofHDEGQ2kNl20p49+i0O2b5yH6Xc7EeqethWkyI8nw1BrrRleRkqfsHU9m8=',
      difficulty: '',
      totalDifficulty: '',
      size: 0,
      extraData: '0x',
      gasLimit: 10000,
      gasUsed: 1,
      timestamp: moment('2019-06-17T23:33:04.755448Z').valueOf(),
      transactions: [],
      uncles: []
    };
  }

}

export const apiController = new ApiController();

