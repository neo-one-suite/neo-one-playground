/* @hash bccbb91a3b993ede3ce7051045ed8f63 */
// tslint:disable
/* eslint-disable */
import { Client, DeveloperClient, DeveloperTools, LocalClient } from '@neo-one/client';
import * as React from 'react';
import { Contracts } from './types';
import { createClient, createDeveloperClients, createLocalClients } from './client';

import { createOneSmartContract } from './One/contract';
import { createFeatureTestSmartContract } from './FeatureTest/contract';
import { createGASVacSmartContract } from './GASVac/contract';
import { createWrappedNEOSmartContract } from './WrappedNEO/contract';
import { createEscrowSmartContract } from './Escrow/contract';
import { createSmartDonationSmartContract } from './SmartDonation/contract';

export interface WithClients<TClient extends Client> {
  readonly client: TClient;
  readonly developerClients: {
    readonly [network: string]: DeveloperClient;
  };
  readonly localClients: {
    readonly [network: string]: LocalClient;
  };
}
export type ContractsWithClients<TClient extends Client> = Contracts & WithClients<TClient>;
const Context: any = React.createContext<ContractsWithClients<Client>>(undefined as any);

export type ContractsProviderProps<TClient extends Client> = Partial<WithClients<TClient>> & {
  readonly children?: React.ReactNode;
};
export const ContractsProvider = <TClient extends Client>({
  client: clientIn,
  developerClients: developerClientsIn,
  localClients: localClientsIn,
  children,
}: ContractsProviderProps<TClient>) => {
  const client = clientIn === undefined ? createClient() : clientIn;
  const developerClients = developerClientsIn === undefined ? createDeveloperClients() : developerClientsIn;
  const localClients = localClientsIn === undefined ? createLocalClients() : localClientsIn;
  DeveloperTools.enable({ client, developerClients, localClients });

  return (
    <Context.Provider
      value={{
        client,
        developerClients,
        localClients,
        one: createOneSmartContract(client),
        featureTest: createFeatureTestSmartContract(client),
        gasVac: createGASVacSmartContract(client),
        wrappedNeo: createWrappedNEOSmartContract(client),
        escrow: createEscrowSmartContract(client),
        smartDonation: createSmartDonationSmartContract(client),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export interface WithContractsProps<TClient extends Client> {
  readonly children: (contracts: ContractsWithClients<TClient>) => React.ReactNode;
}
export const WithContracts = <TClient extends Client>({ children }: WithContractsProps<TClient>) => (
  <Context.Consumer>{children}</Context.Consumer>
);
