/* @hash 9893d3f52480865d732c85b462329be5 */
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
          decimals: 0,
          name: 'wager',
          optional: false,
          type: 'Integer',
        },
        {
          decimals: 0,
          name: 'spinCount',
          optional: false,
          type: 'Integer',
        },
        {
          forwardedValue: false,
          name: 'address',
          optional: false,
          type: 'Address',
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
