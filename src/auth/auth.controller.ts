import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthOauthGuard } from './guards/auth.oauth.guard'

@ApiTags('auth-google')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get('login')
  @UseGuards(AuthOauthGuard)
  @ApiResponse({ status: 200, description: 'Google Login, dont work swagger, open in browser' })
  @ApiInternalServerErrorResponse({
    description: 'TypeError: NetworkError when attempting to fetch resource.'
  })
  async googleLogin() {}

  @Get('callback')
  @UseGuards(AuthOauthGuard)
  async googleLoginCallback(@Req() req: any, @Res() res: Response) {
    const googleAccessToken = req.user.accessToken
    const googleRefreshToken = req.user.refreshToken

    res.cookie('access_token', googleAccessToken, { httpOnly: true })
    res.cookie('refresh_token', googleRefreshToken, { httpOnly: true })

    res.redirect(this.configService.get('GOOGLE_REDIRECT_URL'))
  }

  @Get('profile')
  @UseGuards(AuthOauthGuard)
  async getProfile(@Req() req: any) {
    const accessToken = req.cookies['access_token']
    if (accessToken) {
      return 'redireciona para alguma página que desejar'
    }
    throw new UnauthorizedException('No access token')
  }

  @Get('logout')
  @ApiResponse({ status: 200, description: 'Google Logout' })
  @ApiBadRequestResponse({ status: 401, description: 'Error: Unauthorized' })
  async logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token']
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    await this.authService.revokeGoogleToken(refreshToken).catch(() => true)

    return res.redirect(`${this.configService.get('BASE_URL')}/auth/login`)
  }
}
