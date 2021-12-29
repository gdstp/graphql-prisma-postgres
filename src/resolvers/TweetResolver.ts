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

  @Mutation((returns) => Tweet, { name: 'updateTweet' })
  @Authorized()
  async update(
    @Ctx() { prisma, token }: Context,
    @Arg('description') description: string,
    @Arg('tweetId') tweetId: number
  ) {
    const userId = await JWT.Decode(token);
    const tweet = await prisma.tweet.findFirst({
      where: { id: tweetId, userId },
    });
    if (!tweet) {
      throw new Error('Tweet does not exists');
    }
    const updatedTweet = await prisma.tweet.update({
      where: { id: tweetId },
      data: { description },
    });
    return updatedTweet;
  }
}

export default TweetResolver;
