import { formatOutputObject } from 'web3-utils';
import {
    BlockTags,
    IWeb3Provider,
    ValidTypesEnum,
    PrefixedHexString,
} from 'web3-core-types/src/types';
import { TransactionFactory, TypedTransaction } from '@ethereumjs/tx';
import { getBlockByNumber, getGasPrice } from 'web3-core-eth-method';
import Web3CoreLogger from 'web3-core-logger';

import {
    EthTxEip1559,
    EthTxEip2930,
    EthTxLegacy,
    EthTxNormalized,
    EthTxOptions,
} from './types';
import { Web3EthTxErrorsConfig, Web3EthTxErrorNames } from './errors';

const web3CoreLogger = new Web3CoreLogger(Web3EthTxErrorsConfig);

export function initEthTx(
    txData: EthTxLegacy | EthTxEip2930 | EthTxEip1559,
    options: EthTxOptions
): TypedTransaction {
    try {
        // Convert all ValidType properties to prefixed hex strings
        let modifiedTxData = formatOutputObject(
            txData,
            [
                'nonce',
                'v',
                'value',
                'chainId',
                'gasLimit',
                'gasPrice',
                'type',
                'maxPriorityFeePerGas',
                'maxFeePerGas',
            ],
            ValidTypesEnum.PrefixedHexString
        );

        if (options.dontFillProperties !== true) {
            if (options.web3Provider === undefined)
                throw web3CoreLogger.makeError(
                    Web3EthTxErrorNames.noWeb3Provider,
                    {
                        reason: 'Attempting to fill missing transaction properties, but no Web3Provider is available to make requests to',
                    }
                );

            modifiedTxData = _fillProperties(
                modifiedTxData,
                options.web3Provider
            );
        }
        return TransactionFactory.fromTxData(modifiedTxData);
    } catch (error) {
        throw error;
    }
}

async function _fillProperties(
    txData: EthTxNormalized,
    web3Provider: IWeb3Provider
): Promise<EthTxNormalized> {
    let _txData = { ...txData };

    // Check if EIP-1559
    if (
        _txData.type === '0x2' ||
        _txData.maxPriorityFeePerGas !== undefined ||
        _txData.maxFeePerGas !== undefined
    ) {
        _txData = await _fillEip1559(_txData, web3Provider);
    } else {
        if (_txData.accessList) _txData.type = '0x1';
        const gasPrice = await getGasPrice(web3Provider);
        _txData.gasPrice = gasPrice.result as PrefixedHexString;
    }

    return _txData;
}

async function _fillEip1559(
    txData: EthTxNormalized,
    web3Provider: IWeb3Provider
): Promise<EthTxNormalized> {
    let _txData = txData;

    _txData.type = '0x2';
    if (_txData.maxPriorityFeePerGas === undefined)
        _txData.maxPriorityFeePerGas = '0x3B9ACA00'; // 1 Gwei

    if (_txData.maxFeePerGas === undefined) {
        if (web3Provider === undefined)
            throw web3CoreLogger.makeError(
                Web3EthTxErrorNames.invalidTxEip1559,
                {
                    reason: 'Missing maxFeePerGas property, and no web3Provider available to fetch value',
                    params: { txData: _txData },
                }
            );

        const block = await getBlockByNumber(
            web3Provider,
            BlockTags.latest,
            false
        );
        if (block.result?.baseFeePerGas) {
            _txData.maxFeePerGas = (
                BigInt(block.result.baseFeePerGas) * BigInt(2) +
                BigInt(_txData.maxPriorityFeePerGas)
            ).toString(16);
        }
    }

    return _txData;
}
