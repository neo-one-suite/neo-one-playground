/* @hash ac3883f30aa3c7999c0fa24e220f258e */
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
        optional: false,
        type: 'Void',
      },
      verify: false,
    },
    {
      constant: false,
      name: 'consoleLog',
      parameters: [],
      returnType: {
        optional: false,
        type: 'Void',
      },
      verify: false,
    },
    {
      constant: false,
      name: 'typeError',
      parameters: [],
      returnType: {
        optional: false,
        type: 'Void',
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
