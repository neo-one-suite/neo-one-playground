import { FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import { formatDistanceStrict } from 'date-fns';
import _ from 'lodash';
import * as React from 'react';
import { Grid, styled } from 'reakit';
import { combineLatest, concat, of, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { WithContracts } from '../../../one/generated';
import { ComponentProps } from '../../types';

const StyledGrid = styled(Grid)`
  padding: 8px 0;
`;

const StyledTime = styled('time')`
  min-width: ${({ value }: { readonly value: string }) => Math.max(30, value.length * 8)}px;
`;

interface TimeAgoProps {
  readonly startTimeMS?: number;
  readonly durationMS?: number;
  readonly nowMS?: number;
}

const TIMER = 100;
function TimeAgo({ startTimeMS, durationMS, nowMS, ...props }: TimeAgoProps): JSX.Element {
  if (startTimeMS === undefined || durationMS === undefined || nowMS === undefined) {
    return (
      <>
        <Grid.Item data-test="info-countdown">Countdown:</Grid.Item>
        <Grid.Item data-test="info-countdown-value" />
      </>
    );
  }
  const endTimeMS = startTimeMS + durationMS;

  return (
    <FromStream
      props$={concat(of(0), timer(0, TIMER)).pipe(
        map((inc) => {
          const currentNow = nowMS + Math.floor(inc * TIMER);

          const countdown = startTimeMS > currentNow;
          const complete = endTimeMS < currentNow;
          const value = countdown
            ? formatDistanceStrict(new Date(startTimeMS), currentNow)
            : complete
              ? undefined
              : formatDistanceStrict(currentNow, new Date(endTimeMS));

          return { countdown, value };
        }),
        distinctUntilChanged<{ countdown: boolean; value: string | undefined }>((a, b) => _.isEqual(a, b)),
      )}
    >
      {({ countdown, value }) => (
        <>
          {countdown ? (
            <Grid.Item data-test="info-countdown">Countdown:</Grid.Item>
          ) : (
            <Grid.Item data-test="info-countdown">Time Left:</Grid.Item>
          )}
          <Grid.Item data-test="info-countdown-value">
            {value === undefined ? (
              'Ended'
            ) : (
              <StyledTime value={value} {...props}>
                {value}
              </StyledTime>
            )}
          </Grid.Item>
        </>
      )}
    </FromStream>
  );
}

export function Info(props: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, ico }) => (
        <FromStream
          props$={concat(
            of(undefined),
            combineLatest(client.block$, client.currentAccount$, client.currentNetwork$).pipe(
              switchMap(async ([{ block }, account, network]) => {
                const [
                  startTimeSeconds,
                  durationSeconds,
                  amountPerNEO,
                  totalSupply,
                  remaining,
                  balance,
                ] = await Promise.all([
                  ico.startTimeSeconds(),
                  ico.icoDurationSeconds(),
                  ico.amountPerNEO(),
                  ico.totalSupply(),
                  ico.remaining(),
                  account === undefined ? Promise.resolve(new BigNumber(0)) : ico.balanceOf(account.id.address),
                ]);

                return {
                  startTimeMS: startTimeSeconds.toNumber() * 1000,
                  durationMS: durationSeconds.toNumber() * 1000,
                  amountPerNEO,
                  totalSupply,
                  remaining,
                  nowMS: block.time * 1000,
                  balance,
                  address: ico.definition.networks[network].address,
                };
              }),
            ),
          )}
        >
          {(value) => (
            <StyledGrid columns="160px 1fr" autoRows="auto" gap="0" {...props}>
              <TimeAgo
                startTimeMS={value === undefined ? undefined : value.startTimeMS}
                durationMS={value === undefined ? undefined : value.durationMS}
                nowMS={value === undefined ? undefined : value.nowMS}
              />
              <Grid.Item data-test="info-neo-contributed">NEO Contributed:</Grid.Item>
              <Grid.Item data-test="info-neo-contributed-value">
                {value === undefined ? '' : value.totalSupply.div(value.amountPerNEO).toFormat()}
              </Grid.Item>
              <Grid.Item data-test="info-remaining">Remaining:</Grid.Item>
              <Grid.Item data-test="info-remaining-value">
                {value === undefined ? '' : value.remaining.toFormat()}
              </Grid.Item>
              <Grid.Item data-test="info-balance">Your Balance:</Grid.Item>
              <Grid.Item data-test="info-balance-value">
                {value === undefined ? '' : value.balance.toFormat()}
              </Grid.Item>
              <Grid.Item data-test="info-address">ONE Address:</Grid.Item>
              <Grid.Item data-test="info-address-value">{value === undefined ? '' : value.address}</Grid.Item>
            </StyledGrid>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
