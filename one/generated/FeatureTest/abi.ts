/* @hash 65fca8d085bab0078f9c79fce6a606de */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const featureTestABI: ABI = {
  events: [],
  functions: [
    {
      constant: true,
      name: 'owner',
      parameters: [],
      returnType: {
        forwardedValue: false,
        optional: false,
        type: 'Address',
      },
    },
    {
      claim: false,
      constant: false,
      name: 'stackTrace',
      parameters: [],
      receive: false,
      returnType: {
        optional: false,
        type: 'Void',
      },
      send: false,
    },
    {
      claim: false,
      constant: false,
      name: 'consoleLog',
      parameters: [],
      receive: false,
      returnType: {
        optional: false,
        type: 'Void',
      },
      send: false,
    },
    {
      claim: false,
      constant: false,
      name: 'typeError',
      parameters: [],
      receive: false,
      returnType: {
        optional: false,
        type: 'Void',
      },
      send: false,
    },
    {
      name: 'refundAssets',
      parameters: [
        {
          name: 'transactionHash',
          type: 'Hash256',
        },
      ],
      returnType: {
        type: 'Boolean',
      },
      send: true,
    },
    {
      name: 'deploy',
      parameters: [
        {
          default: {
            type: 'sender',
          },
          forwardedValue: false,
          name: 'owner',
          optional: true,
          type: 'Address',
        },
      ],
      returnType: {
        type: 'Boolean',
      },
    },
  ],
};
