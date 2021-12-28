import { buildSchemaSync } from 'type-graphql';
import SessionController from '../resolvers/SessionResolver';
import UserResolver from '../resolvers/UserResolver';
import User from './User';

export default buildSchemaSync({
  resolvers: [User, UserResolver, SessionController],
});
