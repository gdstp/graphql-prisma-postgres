import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import User from '../schemas/User';

@Resolver(User)
class UserResolver {
  @Query((returns) => [User])
  async find(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  @Mutation((returns) => User, { name: 'createUser' })
  async create(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.user.create({ data: { username, name, password } });
  }
}

export default UserResolver;
