/* @hash 0491fb4c053c52d2e377964685f3da2d */
// tslint:disable
/* eslint-disable */
import { DeveloperTools as DeveloperToolsBase } from '@neo-one/react';
import { Client, DeveloperClient, OneClient } from '@neo-one/client';
import React, { ComponentType } from 'react';
import { Contracts } from './types';
import { createClient, createDeveloperClients, createOneClients } from './client';
import { projectID } from './projectID';
import { createOneSmartContract } from './One/contract';
import { createFeatureTestSmartContract } from './FeatureTest/contract';
import { createGASVacSmartContract } from './GASVac/contract';
import { createSlotsSmartContract } from './Slots/contract';
import { createWrappedNEOSmartContract } from './WrappedNEO/contract';
import { createEscrowSmartContract } from './Escrow/contract';

export interface WithClients<TClient extends Client> {
  readonly client: TClient;
  readonly developerClients: {
    readonly [network: string]: DeveloperClient;
  };
  readonly oneClients: {
    readonly [network: string]: OneClient;
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
  oneClients: oneClientsIn,
  children,
}: ContractsProviderProps<TClient>) => {
  const client = clientIn === undefined ? createClient() : clientIn;
  const developerClients = developerClientsIn === undefined ? createDeveloperClients() : developerClientsIn;
  const oneClients = oneClientsIn === undefined ? createOneClients() : oneClientsIn;

  return (
    <Context.Provider
      value={{
        client,
        developerClients,
        oneClients,
        one: createOneSmartContract(client),
        featureTest: createFeatureTestSmartContract(client),
        gasVac: createGASVacSmartContract(client),
        slots: createSlotsSmartContract(client),
        wrappedNeo: createWrappedNEOSmartContract(client),
        escrow: createEscrowSmartContract(client),
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

export const DeveloperTools = () => (
  <WithContracts>
    {({ client, developerClients, oneClients }) => (
      <DeveloperToolsBase
        client={client}
        developerClients={developerClients}
        oneClients={oneClients}
        projectID={projectID}
      />
    )}
  </WithContracts>
);
