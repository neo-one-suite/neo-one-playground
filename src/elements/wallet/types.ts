// tslint:disable no-any no-unused
import { AddressString } from '@neo-one/client';
import * as React from 'react';

export type ReactSyntheticEvent = React.SyntheticEvent<any>;

export interface NetworkClients<T> {
  readonly [network: string]: T | undefined;
}

export interface Token {
  readonly network: string;
  readonly address: AddressString;
  readonly symbol: AddressString;
  readonly decimals: number;
}
