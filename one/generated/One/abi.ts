/* @hash 3a9f7d158c8e8884c6211adaa93f8009 */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const oneABI: ABI = {
  events: [
    {
      name: 'transfer',
      parameters: [
        {
          forwardedValue: false,
          name: 'from',
          optional: true,
          type: 'Address',
        },
        {
          forwardedValue: false,
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
          forwardedValue: false,
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
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
          forwardedValue: false,
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
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
        forwardedValue: false,
        optional: false,
        type: 'String',
      },
    },
    {
      constant: true,
      name: 'symbol',
      parameters: [],
      returnType: {
        forwardedValue: false,
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
        forwardedValue: false,
        optional: false,
        type: 'Address',
      },
    },
    {
      constant: true,
      name: 'icoStartTimeSeconds',
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
          forwardedValue: false,
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
          forwardedValue: false,
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
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
          forwardedValue: false,
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
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
        {
          forwardedValue: false,
          name: 'approveArgs',
          optional: false,
          rest: true,
          type: 'ForwardValue',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
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
          forwardedValue: false,
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
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
        forwardedValue: false,
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
          forwardedValue: false,
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
          forwardedValue: false,
          name: 'asset',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
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
          forwardedValue: false,
          name: 'from',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
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
        forwardedValue: false,
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
          forwardedValue: false,
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
          forwardedValue: false,
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
        forwardedValue: false,
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
          forwardedValue: false,
          name: 'owner',
          optional: true,
          type: 'Address',
        },
        {
          decimals: 0,
          name: 'icoStartTimeSeconds',
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
