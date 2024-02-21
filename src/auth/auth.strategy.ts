import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { UserDto } from 'src/user/dto/user.dto'
import { UserService } from 'src/user/user.service'

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
    const { emails, photos, id, provider } = profile

    const payload = {
      providerId: id,
      cognitoId: id,
      providerName: provider,
      email: emails[0].value,
      isActive: emails[0].verified,
      picture: photos[0].value,
      accessToken,
      refreshToken
    }
    this.saveUser(payload)
    done(null, payload)
  }

  private async saveUser(payload: UserDto) {
    console.log(payload)
    /*
    const user = await this.userService
      .getUserByProvider(payload.providerId)
      .then()
      .catch((error) => {
        throw new Error(error)
      })


    if (!user) {
      const dataUser: UserDto = {
        providerId: payload.providerId,
        cognitoId: payload.cognitoId,
        providerName: payload.providerName,
        email: payload.email,
        isActive: payload.isActive
      }

      await this.userService.createUser(dataUser)
    }
    */
  }
}
