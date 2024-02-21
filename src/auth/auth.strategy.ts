import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { CreateUserDto, UserDto } from '../user/dto/user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email']
    })
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent'
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { emails, photos, id, name } = profile

    const payload = {
      providerId: id,
      name: !name.familyName ? name.givenName : name.familyName,
      email: emails[0].value,
      isActive: emails[0].verified,
      picture: photos[0].value,
      accessToken,
      refreshToken
    }
    console.log(payload.accessToken)
    this.saveUser(payload)
    done(null, payload)
  }

  private async saveUser(payload: UserDto) {
    const user = await this.userService
      .findUserByProviderId(payload.providerId)
      .then()
      .catch((error) => {
        throw new Error(error)
      })

    if (!user) {
      const dataUser: CreateUserDto = {
        providerId: payload.providerId,
        name: payload.name,
        email: payload.email
      }

      await this.userService.create(dataUser)
    }
  }
}
