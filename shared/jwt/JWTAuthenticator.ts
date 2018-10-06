import * as jwt from 'jsonwebtoken';
import { AuthUser } from '../../src/auth/models/auth-model';

export interface Authenticator {
  validate(token: string): Promise<AuthUser>;
  authenticate(user: AuthUser): Promise<string>;
}

export class JWTAuthenticator implements Authenticator {
  private secretKey: string = process.env.PRIVATE_KEY || '!@Secret@!';
  public async validate(token: string): Promise<AuthUser> {
    let cert: Buffer;

    try {
      cert = Buffer.from(this.secretKey, 'utf8');

      const user: any = jwt.verify(token, cert);

      return new AuthUser(user);
    } catch (err) {
      throw err;
    }
  }

  public async authenticate(user: AuthUser): Promise<string> {
    let cert: Buffer;
    cert = Buffer.from(this.secretKey, 'utf8');

    return jwt.sign(
      {
        id: user.id,
        globalRoles: user.globalRoles
      } as Object,
      cert,
      {
        expiresIn: 60 * 60 * 24 * 30
      }
    );
  }
}
