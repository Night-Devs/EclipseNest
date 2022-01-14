import { Body, Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('token')
  async getToken(@Res() response: Response, @Body() body, @Body('code') code: string) {
    if (!code)
      return response.sendStatus(400)

    const tokenResponse = await this.authService.getToken(code)

    if (tokenResponse instanceof Error)
      return response.sendStatus(418)

    response.status(201).send(tokenResponse)
  }

  @Get('token/refresh')
  async refreshToken(@Res() response: Response, @Body('refreshToken') token: string) {
    if (!token)
      return response.sendStatus(400)
    response.status(201).send(await this.authService.refreshToken(token))
  }
}
