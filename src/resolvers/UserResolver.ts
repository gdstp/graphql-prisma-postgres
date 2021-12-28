import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import User from '../schemas/User';

@Resolver(User)
class UserResolver {
  @Query((returns) => [User])
  async find(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }
}

export default UserResolver;
