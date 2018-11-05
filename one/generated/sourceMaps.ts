/* @hash 172ca45144b58cefcd7153b0fd145af9 */
// tslint:disable
/* eslint-disable */
/* @source-map-hash b765b7ae868e5f6e7d52c41396c18c36 */
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
