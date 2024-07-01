import { Client, Connection } from '@temporalio/client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dataConverter from '$dc';

const client: Client = makeClient();

function makeClient(): Client {
  const connection = Connection.lazy({
    address: 'localhost:7233',
    // In production, pass options to configure TLS and other settings.
  });
  return new Client({ connection,
    dataConverter: {
      payloadConverterPath: dataConverter
    },
  });
}

export function getTemporalClient(): Client {
  return client;
}
