import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import User from '../schemas/User';
import * as bcrypt from 'bcryptjs';

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
    const hashedPassword = await bcrypt.hash(password, 8);
    return await prisma.user.create({
      data: { username, name, password: hashedPassword },
    });
  }
}

export default UserResolver;
