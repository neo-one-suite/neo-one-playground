/* @hash d242b3b70917dc68866ce19946655b48 */
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
      sendUnsafe: false,
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
