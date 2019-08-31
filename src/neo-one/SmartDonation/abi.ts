/* @hash 0df202488ce7924fa4affca34281a14b */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const smartDonationABI: ABI = {
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
          decimals: 8,
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
          decimals: 8,
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
      name: 'getDonationInfo',
      parameters: [
        {
          forwardedValue: false,
          name: 'source',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: false,
        properties: {
          balance: {
            decimals: 8,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          currentBalance: {
            decimals: 8,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          message: {
            forwardedValue: false,
            optional: false,
            type: 'String',
          },
          topContributor: {
            forwardedValue: false,
            optional: false,
            type: 'Address',
          },
        },
        type: 'Object',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: true,
      name: 'getContributionInfo',
      parameters: [
        {
          forwardedValue: false,
          name: 'source',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
          name: 'contributor',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: false,
        properties: {
          amount: {
            decimals: 8,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          message: {
            forwardedValue: false,
            optional: false,
            type: 'String',
          },
        },
        type: 'Object',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: true,
      name: 'getTopContributorMessage',
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
        forwardedValue: false,
        optional: false,
        type: 'String',
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
          decimals: 8,
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
        {
          forwardedValue: true,
          name: 'to',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: true,
          name: 'message',
          optional: false,
          type: 'String',
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
      name: 'setupContributions',
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
        optional: false,
        type: 'Void',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: false,
      name: 'collect',
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
      name: 'updateMessage',
      parameters: [
        {
          forwardedValue: false,
          name: 'address',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
          name: 'message',
          optional: false,
          type: 'String',
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
      name: 'updateContributorMessage',
      parameters: [
        {
          forwardedValue: false,
          name: 'source',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
          name: 'contributor',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
          name: 'message',
          optional: false,
          type: 'String',
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
