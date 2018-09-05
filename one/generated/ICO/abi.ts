/* @hash c757299779c0252e65415799d6ca5572 */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const icoABI: ABI = {
  events: [
    {
      name: 'transfer',
      parameters: [
        {
          name: 'from',
          optional: true,
          type: 'Address',
        },
        {
          name: 'to',
          optional: true,
          type: 'Address',
        },
        {
          decimals: 8,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
      ],
    },
    {
      name: 'approveSendTransfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          name: 'to',
          optional: false,
          type: 'Address',
        },
        {
          decimals: 8,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
      ],
    },
    {
      name: 'revokeSendTransfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          name: 'to',
          optional: false,
          type: 'Address',
        },
        {
          decimals: 8,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
      ],
    },
  ],
  functions: [
    {
      constant: true,
      name: 'name',
      parameters: [],
      returnType: {
        optional: false,
        type: 'String',
      },
    },
    {
      constant: true,
      name: 'symbol',
      parameters: [],
      returnType: {
        optional: false,
        type: 'String',
      },
    },
    {
      constant: true,
      name: 'decimals',
      parameters: [],
      returnType: {
        decimals: 0,
        optional: false,
        type: 'Integer',
      },
    },
    {
      constant: true,
      name: 'amountPerNEO',
      parameters: [],
      returnType: {
        decimals: 0,
        optional: false,
        type: 'Integer',
      },
    },
    {
      constant: true,
      name: 'owner',
      parameters: [],
      returnType: {
        optional: false,
        type: 'Address',
      },
    },
    {
      constant: true,
      name: 'startTimeSeconds',
      parameters: [],
      returnType: {
        decimals: 0,
        optional: false,
        type: 'Integer',
      },
    },
    {
      constant: true,
      name: 'icoDurationSeconds',
      parameters: [],
      returnType: {
        decimals: 0,
        optional: false,
        type: 'Integer',
      },
    },
    {
      constant: true,
      name: 'totalSupply',
      parameters: [],
      returnType: {
        decimals: 8,
        optional: false,
        type: 'Integer',
      },
    },
    {
      claim: false,
      constant: true,
      name: 'balanceOf',
      parameters: [
        {
          name: 'address',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        decimals: 8,
        optional: false,
        type: 'Integer',
      },
      send: false,
    },
    {
      claim: false,
      constant: true,
      name: 'approvedTransfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          name: 'to',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        decimals: 8,
        optional: false,
        type: 'Integer',
      },
      send: false,
    },
    {
      claim: false,
      constant: false,
      name: 'transfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          name: 'to',
          optional: false,
          type: 'Address',
        },
        {
          decimals: 8,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Boolean',
      },
      send: false,
    },
    {
      claim: false,
      constant: false,
      name: 'approveSendTransfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          name: 'to',
          optional: false,
          type: 'Address',
        },
        {
          decimals: 0,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Boolean',
      },
      send: false,
    },
    {
      claim: false,
      constant: false,
      name: 'approveReceiveTransfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          decimals: 8,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
        {
          name: 'asset',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Boolean',
      },
      send: false,
    },
    {
      claim: false,
      constant: false,
      name: 'revokeSendTransfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          name: 'to',
          optional: false,
          type: 'Address',
        },
        {
          decimals: 8,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Boolean',
      },
      send: false,
    },
    {
      claim: false,
      constant: false,
      name: 'onRevokeSendTransfer',
      parameters: [
        {
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          decimals: 8,
          name: 'amount',
          optional: false,
          type: 'Integer',
        },
        {
          name: 'asset',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Void',
      },
      send: false,
    },
    {
      constant: true,
      name: 'remaining',
      parameters: [],
      returnType: {
        decimals: 8,
        optional: false,
        type: 'Integer',
      },
    },
    {
      claim: false,
      constant: false,
      name: 'mintTokens',
      parameters: [],
      receive: true,
      returnType: {
        optional: false,
        type: 'Boolean',
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
          name: 'owner',
          optional: true,
          type: 'Address',
        },
        {
          decimals: 0,
          name: 'startTimeSeconds',
          optional: true,
          type: 'Integer',
        },
        {
          decimals: 0,
          name: 'icoDurationSeconds',
          optional: true,
          type: 'Integer',
        },
      ],
      returnType: {
        type: 'Boolean',
      },
    },
  ],
};
