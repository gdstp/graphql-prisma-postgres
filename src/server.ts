import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import schemas from './schemas';
import { context } from './context';

const app = async () => {
  new ApolloServer({ schema: schemas, context }).listen({ port: 4000 }, () =>
    console.log(`Server running on port 4000`)
  );
};

app();
