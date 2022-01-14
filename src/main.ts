import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'

// Loading .env config
config()

// Checking .env config
// Checking for OAuth2 options
if (!process.env.CLIENT_ID     ||
    !process.env.CLIENT_SECRET ||
    !process.env.REDIRECT_URL) {
  console.log('[Config] Not enough info about application.')
  console.log('These modules are temporary disabled: OAuth2.')
  console.log('Need info to enabled OAuth2 module: CLIENT_ID, CLIENT_SECRET, REDIRECT_URL.')
}

if (isNaN(+process.env.PORT)) {
  console.log('[Config] Port isn\'t specified or wrong, using default :3000.')
}
const port = +process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(port)
}
bootstrap()
