/* @hash 1c87d9d3a9d25e07016fba47fb6ce2aa */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const gasVacABI: ABI = {
  events: [],
  functions: [
    {
      claim: false,
      constant: false,
      name: 'vacuum',
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
      parameters: [],
      returnType: {
        type: 'Boolean',
      },
    },
  ],
};
