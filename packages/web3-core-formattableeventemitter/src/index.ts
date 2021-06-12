import { EventEmitter } from 'events';
import { ValidTypesEnum } from 'web3-utils/types';
import {formatOutput} from 'web3-utils'

import { FormattableEventEmitterOptions, OnOptions } from '../types';

export class FormattableEventEmitter extends EventEmitter {
    private _returnType: ValidTypesEnum;

    constructor(options: FormattableEventEmitterOptions) {
        super();
        this._returnType = options.returnType || ValidTypesEnum.HexString;
    }

    formattableOn(
        event: string | symbol,
        listener: (...args: any[]) => void,
        options: OnOptions): any {
        super.on(event, (response: any) => {
            
        }))
    }
}
