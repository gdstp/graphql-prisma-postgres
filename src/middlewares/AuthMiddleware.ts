import { AuthChecker } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import { Context } from '../context';

const AuthMiddleware: AuthChecker<Context> = ({ context }): boolean => {
  const authHeader = context.token;

  if (!authHeader) {
    return false;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    return !!decoded;
  } catch (error) {
    return false;
  }
};

export default AuthMiddleware;
