import * as jwt from 'jsonwebtoken';
import auth from '../config/auth';

class JWT {
  async Sign(id: string) {
    return jwt.sign({}, auth.jwt.secret, {
      subject: id,
      expiresIn: auth.jwt.expiresIn,
    });
  }
}

export default new JWT();
