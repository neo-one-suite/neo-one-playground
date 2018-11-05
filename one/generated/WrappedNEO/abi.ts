/* @hash 41c758acc01d2b9c75e80a1afa2e84a2 */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const wrappedNeoABI: ABI = {
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
          decimals: 0,
          forwardedValue: false,
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
          decimals: 0,
          forwardedValue: false,
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
          decimals: 0,
          forwardedValue: false,
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
        forwardedValue: false,
        optional: false,
        type: 'Integer',
      },
    },
    {
      constant: true,
      name: 'totalSupply',
      parameters: [],
      returnType: {
        decimals: 0,
        forwardedValue: false,
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
        decimals: 0,
        forwardedValue: false,
        optional: false,
        type: 'Integer',
      },
      send: false,
      sendUnsafe: false,
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
        decimals: 0,
        forwardedValue: false,
        optional: false,
        type: 'Integer',
      },
      send: false,
      sendUnsafe: false,
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
          decimals: 0,
          forwardedValue: false,
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
      sendUnsafe: false,
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
          decimals: 0,
          forwardedValue: false,
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
      sendUnsafe: false,
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
          decimals: 0,
          forwardedValue: false,
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
      sendUnsafe: false,
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
          decimals: 0,
          forwardedValue: false,
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
      sendUnsafe: false,
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
          decimals: 0,
          forwardedValue: false,
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
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: false,
      name: 'wrapNEO',
      parameters: [],
      receive: true,
      returnType: {
        forwardedValue: false,
        optional: false,
        type: 'Boolean',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: false,
      name: 'unwrapNEO',
      parameters: [],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: false,
        type: 'Boolean',
      },
      send: true,
      sendUnsafe: false,
    },
    {
      name: 'refundAssets',
      parameters: [],
      returnType: {
        type: 'Boolean',
      },
      sendUnsafe: true,
    },
    {
      name: 'completeSend',
      parameters: [],
      returnType: {
        type: 'Boolean',
      },
      sendUnsafe: true,
    },
    {
      name: 'deploy',
      parameters: [],
      returnType: {
        type: 'Boolean',
      },
    },
  ],
};
