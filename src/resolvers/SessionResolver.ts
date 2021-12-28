import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import User from '../schemas/User';
import Encrypter from '../libs/encrypter';
import JWT from '../libs/jsonwebtoken';

@Resolver(User)
class SessionResolver {
  @Query((returns) => String)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context
  ) {
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatches = await Encrypter.Compare(password, user.password);
    if (!passwordMatches) {
      throw new Error('Incorrect credentials');
    }

    const token = JWT.Sign(user.name);

    return token;
  }
}

export default SessionResolver;
