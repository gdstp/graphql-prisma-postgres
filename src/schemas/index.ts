import { buildSchemaSync } from 'type-graphql';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import SessionResolver from '../resolvers/SessionResolver';
import TweetResolver from '../resolvers/TweetResolver';
import UserResolver from '../resolvers/UserResolver';
import Tweet from './Tweet';
import User from './User';

export default buildSchemaSync({
  resolvers: [User, UserResolver, SessionResolver, Tweet, TweetResolver],
  authChecker: AuthMiddleware,
});
