import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import User from '../schemas/User';
import * as bcrypt from 'bcryptjs';

@Resolver(User)
class SessionController {
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

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error('Incorrect credentials');
    }

    return 'ok';
  }
}

export default SessionController;
