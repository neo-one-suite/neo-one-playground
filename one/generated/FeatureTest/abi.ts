/* @hash 725cc84cbd58eb8139787d42c7a81e77 */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const featureTestABI: ABI = {
  events: [],
  functions: [
    {
      constant: true,
      name: 'owner',
      returnType: {
        optional: false,
        type: 'Address',
      },
      verify: false,
    },
    {
      constant: false,
      name: 'stackTrace',
      parameters: [],
      returnType: {
        type: 'Buffer',
      },
      verify: false,
    },
    {
      constant: false,
      name: 'consoleLog',
      parameters: [],
      returnType: {
        type: 'Buffer',
      },
      verify: false,
    },
    {
      constant: false,
      name: 'typeError',
      parameters: [],
      returnType: {
        type: 'Buffer',
      },
      verify: false,
    },
    {
      constant: false,
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
      ],
      returnType: {
        type: 'Boolean',
      },
      verify: false,
    },
  ],
};
