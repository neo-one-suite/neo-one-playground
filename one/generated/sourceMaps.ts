/* @hash 19aae642d6e7c3f9626cdfd9e7c554d0 */
// tslint:disable
/* eslint-disable */
/* @source-map-hash 188ce26a4e9d59b4fe04e17a2dbdc98e */
import { OneClient, SourceMaps } from '@neo-one/client';
import { projectID } from './projectID';

let sourceMapsIn: Promise<SourceMaps> = Promise.resolve({});
if (process.env.NODE_ENV !== 'production') {
  sourceMapsIn = Promise.resolve().then(async () => {
    const client = new OneClient(40101);
    const result = await client.request({
      plugin: '@neo-one/server-plugin-project',
      options: { type: 'sourceMaps', projectID },
    });

    return result.response;
  });
}

export const sourceMaps = sourceMapsIn;
