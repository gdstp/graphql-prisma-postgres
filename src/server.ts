import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import schemas from './schemas';
import prisma from './libs/prisma';

const app = async () => {
  new ApolloServer({
    schema: schemas,
    context: ({ req }) => ({ prisma, token: req.headers.authorization }),
  }).listen({ port: 4000 }, () => console.log(`Server running on port 4000`));
};

app();
