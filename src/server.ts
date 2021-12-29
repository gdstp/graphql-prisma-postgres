import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import schemas from './schemas';
import prisma from './libs/prisma';
import JWT from './libs/jsonwebtoken';

const app = async () => {
  new ApolloServer({
    schema: schemas,
    context: async ({ req }) => ({
      prisma,
      token: req.headers.authorization,
      userId: (await JWT.Decode(req.headers.authorization)) || null,
    }),
  }).listen({ port: 4000 }, () => console.log(`Server running on port 4000`));
};

app();
