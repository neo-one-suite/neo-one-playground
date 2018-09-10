/* @hash 988ebfe5ad764078e4c5f1a20344162a */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const slotsABI: ABI = {
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
      constant: true,
      name: 'contractInfo',
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
      constant: true,
      name: 'spin',
      parameters: [
        {
          forwardedValue: false,
          name: 'wager',
          optional: false,
          type: 'String',
        },
        {
          forwardedValue: false,
          name: 'Address',
          optional: false,
          type: 'Hash256',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Array',
        value: {
          decimals: 0,
          optional: false,
          type: 'Integer',
        },
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
