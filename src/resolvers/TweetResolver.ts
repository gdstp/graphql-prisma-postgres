import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import Tweet from '../schemas/Tweet';
import JWT from '../libs/jsonwebtoken';

@Resolver(Tweet)
class TweetResolver {
  @Query((returns) => [Tweet], { name: 'findAllTweets' })
  async findAll(@Ctx() { prisma }: Context) {
    return await prisma.tweet.findMany();
  }

  @Mutation((returns) => Tweet, { name: 'createTweet' })
  @Authorized()
  async create(
    @Ctx() { prisma, token }: Context,
    @Arg('description') description: string
  ) {
    const userId = await JWT.Decode(token);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const tweet = await prisma.tweet.create({
      data: { user: { connect: { id: userId } }, likes: 0, description },
    });
    return { ...tweet, user };
  }
}

export default TweetResolver;
