import { AxiosRequestConfig } from 'axios';
import { ValidTypesEnum } from 'web3-utils/types';

export interface HttpOptions {
    axiosConfig?: AxiosRequestConfig;
    subscriptionOptions?: SubscriptionOptions;
}

export interface SubscriptionOptions {
    milisecondsBetweenRequests?: number;
    returnType?: ValidTypesEnum;
}
