import _ from 'lodash';
import moment from 'moment';
import Antenna from 'iotex-antenna';
import BaseService from './base.service';
import { Assert, Exception } from '@common/exceptions';
import { Code } from '@common/enums';

const antenna = new Antenna("https://api.iotex.one");

class ApiService extends BaseService {

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

export const apiService = new ApiService();
