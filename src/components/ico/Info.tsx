import styled from '@emotion/styled';
import { FromStream } from '@neo-one/react';
import { Box } from '@neo-one/react-core';
import BigNumber from 'bignumber.js';
import { formatDistanceStrict } from 'date-fns';
import _ from 'lodash';
import * as React from 'react';
import { combineLatest, concat, of, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { WithContracts } from '../../neo-one';
import { ComponentProps } from '../../types';

const StyledGrid = styled(Box)`
  display: grid;
  padding: 8px 0;
  grid-template-columns: 160px 1fr;
  grid-auto-rows: auto;
  grid-gap: 0;
`;

const GridItem = styled(Box)``;

const StyledTime = styled('time')<{ readonly value: string }>`
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
        <GridItem data-test="info-countdown">Countdown:</GridItem>
        <GridItem data-test="info-countdown-value" />
      </>
    );
  }
  const endTimeMS = startTimeMS + durationMS;

  return (
    <FromStream
      props={[nowMS, startTimeMS, durationMS, endTimeMS]}
      createStream={() =>
        concat(of(0), timer(0, TIMER)).pipe(
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
        )
      }
    >
      {({ countdown, value }) => (
        <>
          {countdown ? (
            <GridItem data-test="info-countdown">Countdown:</GridItem>
          ) : (
            <GridItem data-test="info-countdown">Time Left:</GridItem>
          )}
          <GridItem data-test="info-countdown-value">
            {value === undefined ? (
              'Ended'
            ) : (
              <StyledTime value={value} {...props}>
                {value}
              </StyledTime>
            )}
          </GridItem>
        </>
      )}
    </FromStream>
  );
}

export function Info(props: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, one }) => (
        <FromStream
          props={[client, one]}
          createStream={() =>
            concat(
              of(undefined),
              combineLatest([client.block$, client.currentUserAccount$, client.currentNetwork$]).pipe(
                switchMap(async ([{ block }, account, network]) => {
                  const [
                    startTimeSeconds,
                    durationSeconds,
                    amountPerNEO,
                    totalSupply,
                    remaining,
                    balance,
                  ] = await Promise.all([
                    one.icoStartTimeSeconds(),
                    one.icoDurationSeconds(),
                    one.amountPerNEO(),
                    one.totalSupply(),
                    one.remaining(),
                    account === undefined ? Promise.resolve(new BigNumber(0)) : one.balanceOf(account.id.address),
                  ]);

                  return {
                    startTimeMS: startTimeSeconds.toNumber() * 1000,
                    durationMS: durationSeconds.toNumber() * 1000,
                    amountPerNEO,
                    totalSupply,
                    remaining,
                    nowMS: block.time * 1000,
                    balance,
                    address: one.definition.networks[network].address,
                  };
                }),
              ),
            )
          }
        >
          {(value) => (
            <StyledGrid {...props}>
              <TimeAgo
                startTimeMS={value === undefined ? undefined : value.startTimeMS}
                durationMS={value === undefined ? undefined : value.durationMS}
                nowMS={value === undefined ? undefined : value.nowMS}
              />
              <GridItem data-test="info-neo-contributed">NEO Contributed:</GridItem>
              <GridItem data-test="info-neo-contributed-value">
                {value === undefined ? '' : value.totalSupply.div(value.amountPerNEO).toFormat()}
              </GridItem>
              <GridItem data-test="info-remaining">Remaining:</GridItem>
              <GridItem data-test="info-remaining-value">
                {value === undefined ? '' : value.remaining.toFormat()}
              </GridItem>
              <GridItem data-test="info-balance">Your Balance:</GridItem>
              <GridItem data-test="info-balance-value">{value === undefined ? '' : value.balance.toFormat()}</GridItem>
              <GridItem data-test="info-address">ONE Address:</GridItem>
              <GridItem data-test="info-address-value">{value === undefined ? '' : value.address}</GridItem>
            </StyledGrid>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
