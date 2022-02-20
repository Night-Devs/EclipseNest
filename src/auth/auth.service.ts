import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { TokenResponseDTO } from './dto/TokenResponseDTO'
import { URLSearchParams } from 'url'

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  private token(params: URLSearchParams): Promise<TokenResponseDTO> {
    return new Promise(res => {
      const responseObserver = this.httpService.post(`https://discord.com/api/v9/oauth2/token`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const subscriber = responseObserver.subscribe({
        next(val) {
          subscriber.unsubscribe()
          const {
            access_token,
            token_type,
            refresh_token,
            expires_in,
            scope
          } = val.data
          res({
            accessToken: access_token,
            tokenType: token_type,
            refreshToken: refresh_token,
            expiresIn: expires_in,
            scope
          })
        },
        error(err) {
          subscriber.unsubscribe()
          res(err)
        }
      })
    })
  }

  getToken(code: string): Promise<TokenResponseDTO> {
    const params = new URLSearchParams()
    params.append('client_id', process.env.CLIENT_ID)
    params.append('client_secret', process.env.CLIENT_SECRET)
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', process.env.REDIRECT_URL)
    params.append('code', code)
    
    return this.token(params)
  }

  refreshToken(token: string): Promise<TokenResponseDTO> {
    const params = new URLSearchParams()
    params.append('client_id', process.env.CLIENT_ID)
    params.append('client_secret', process.env.CLIENT_SECRET)
    params.append('grant_type', 'refresh_token')
    params.append('redirect_uri', process.env.REDIRECT_URL)
    params.append('refresh_token', token)

    return this.token(params)
  }
}
