// eslint-disable-next-line prettier/prettier
import {app} from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Http Serve Rumning ')
  })
