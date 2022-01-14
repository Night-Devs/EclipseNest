export class TokenResponseDTO {
  readonly accessToken: string
  readonly tokenType: string
  readonly expiresIn: number
  readonly refreshToken: string
  readonly scope: string
}
