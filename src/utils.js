import { createClient } from 'contentful';

export const client = createClient({
  host: process.env.HOST,
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});
