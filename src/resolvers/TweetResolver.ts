import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../types';
import Tweet from '../schemas/Tweet';

@Resolver(Tweet)
class TweetResolver {
  @Query((returns) => [Tweet], { name: 'findAllTweets' })
  async findAll(@Ctx() { prisma, userId }: Context) {
    console.log(userId);
    return await prisma.tweet.findMany();
  }

  @Mutation((returns) => Tweet, { name: 'createTweet' })
  @Authorized()
  async create(
    @Ctx() { prisma, userId }: Context,
    @Arg('description') description: string
  ) {
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
    @Ctx() { prisma, userId }: Context,
    @Arg('description') description: string,
    @Arg('tweetId') tweetId: number
  ) {
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

  @Mutation((returns) => Tweet, { name: 'deleteTweet' })
  @Authorized()
  async delete(
    @Ctx() { prisma, userId }: Context,
    @Arg('tweetId') tweetId: number
  ) {
    const tweet = await prisma.tweet.findFirst({
      where: { id: tweetId, userId },
    });
    if (!tweet) {
      throw new Error('Tweet does not exists');
    }
    await prisma.tweet.delete({ where: { id: tweetId } });
    return tweet;
  }

  @Mutation((returns) => Tweet, { name: 'upvoteTweet' })
  @Authorized()
  async upvote(
    @Ctx() { prisma, userId }: Context,
    @Arg('tweetId') tweetId: number
  ) {
    const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });
    if (!tweet) {
      throw new Error('Tweet does not exists');
    }
    if (tweet.userId === userId) {
      throw new Error('Cannot upvote own tweet');
    }

    const updatedTweet = await prisma.tweet.update({
      where: { id: tweetId },
      data: { likes: tweet.likes + 1 },
    });

    return updatedTweet;
  }

  @Mutation((returns) => Tweet, { name: 'downvoteTweet' })
  @Authorized()
  async downvote(
    @Ctx() { prisma, userId }: Context,
    @Arg('tweetId') tweetId: number
  ) {
    const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });
    if (!tweet) {
      throw new Error('Tweet does not exists');
    }
    if (tweet.userId === userId) {
      throw new Error('Cannot downvote own tweet');
    }

    const updatedTweet = await prisma.tweet.update({
      where: { id: tweetId },
      data: { likes: tweet.likes - 1 },
    });

    return updatedTweet;
  }
}

export default TweetResolver;
