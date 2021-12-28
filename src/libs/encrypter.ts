import * as bcrypt from 'bcryptjs';

class Encrypter {
  async Compare(hashedPassword: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async Hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }
}

export default new Encrypter();
