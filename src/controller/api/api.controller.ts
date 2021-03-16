import _ from 'lodash';
import moment from 'moment';
import Antenna from "iotex-antenna";
import { Context } from 'koa';
import BaseController from '../base.controller';
import { apiService } from '@service/index';

const antenna = new Antenna("https://api.iotex.one");

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
    const ret = await antenna.iotx.getChainMeta({});
    return _.get(ret, 'chainMeta.height', 0);
  }

  public async getBalance(address: string) {
    const ret = await antenna.iotx.getAccount({ address });
    return _.get(ret, 'accountMeta.balance', 0);
  }

  public async getBlockByNumber(block_id: number) {
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
  }

}

export const apiController = new ApiController();

