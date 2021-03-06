import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../types';
import User from '../schemas/User';
import Encrypter from '../libs/encrypter';

@Resolver(User)
class UserResolver {
  @Query((returns) => [User])
  async find(@Ctx() { prisma }: Context) {
    return prisma.user.findMany();
  }

  @Query((returns) => User)
  async findUser(@Ctx() { prisma, userId }: Context) {
    return prisma.user.findFirst({ where: { id: userId } });
  }

  @Mutation((returns) => User, { name: 'createUser' })
  async create(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
    @Ctx() { prisma }: Context
  ) {
    const hashedPassword = await Encrypter.Hash(password);
    return await prisma.user.create({
      data: { username, name, password: hashedPassword },
    });
  }
}

export default UserResolver;
