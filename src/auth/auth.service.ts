import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosError } from 'axios'
import { firstValueFrom, map } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  /**
   *
   * @param refreshToken
   * @returns access_token
   * @description GOOGLE_URL_ACCOUNT = https://accounts.google.com/o/oauth2/token
   */
  async getNewAccessToken(refreshToken: string): Promise<string> {
    const data = {
      client_id: this.configService.get('GOOGLE_CLIENT_ID'),
      client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }
    return await firstValueFrom(
      this.httpService.post(`${this.configService.get('GOOGLE_URL_ACCOUNT')}/token`, data).pipe(
        map(async (response) => {
          return response.data.access_token
        })
      )
    ).catch((error: AxiosError) => {
      throw new UnauthorizedException(`Failed to refresh the access token: ${error.message}`)
    })
  }

  async getProfile(token: string) {
    return await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('GOOGLE_URL_API')}/userinfo?alt=json&access_token=${token}`)
        .pipe(
          map(async (response) => {
            return response.data
          })
        )
    ).catch((error: AxiosError) => {
      throw new UnauthorizedException(`Not authorized: ${error.message}`)
    })
  }

  async isTokenExpired(token: string): Promise<boolean> {
    return await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('GOOGLE_URL_API')}/tokeninfo?access_token=${token}`)
        .pipe(
          map(async (response) => {
            const expiresIn = response.data.expires_in
            if (!expiresIn || expiresIn <= 0) {
              return true
            }
          })
        )
    ).catch((error: AxiosError) => {
      throw new UnauthorizedException(`Not authorized`, error.message)
    })
  }

  async revokeGoogleToken(token: string): Promise<boolean> {
    return await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('GOOGLE_URL_ACCOUNT')}/revoke?token=${token}`)
        .pipe(map(async () => true))
    ).catch((error: AxiosError) => {
      throw new UnauthorizedException(
        `Not authorized, Failed to revoke the token: ${error.message}`
      )
    })
  }
}
