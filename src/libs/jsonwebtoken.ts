import * as jwt from 'jsonwebtoken';
import auth from '../config/auth';

class JWT {
  async Sign(id: number) {
    const parsed = id.toString();
    return jwt.sign({}, auth.jwt.secret, {
      subject: parsed,
      expiresIn: auth.jwt.expiresIn,
    });
  }

  async Decode(rawToken: string) {
    if (!rawToken) {
      return null;
    }
    try {
      const [_, token] = rawToken.split(' ');
      const decoded = jwt.decode(token);
      return parseInt(decoded.sub as string);
    } catch (error) {
      return null;
    }
  }
}

export default new JWT();
