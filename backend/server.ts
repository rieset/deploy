import Fastify, {
  FastifyInstance,
  FastifyReply, FastifyRequest,
  RouteShorthandOptions
} from 'fastify'
import { join } from 'path';

const port: number = parseInt(process?.env?.PORT || "1337", 10)
const host: string = process?.env?.HOST || "localhost"

const server: FastifyInstance = Fastify({})

server.register(require('@fastify/static'), {
  root: join(__dirname, 'public'),
  prefix: '/',
  constraints: { host: process?.env?.PUBLIC_URL || 'example.com' }
})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/api', opts, async () => {
  return { pong: 'it worked!' }
})

const start = async () => {
  try {
    await server.listen({ port, host }, (err, address) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        console.log(`Server listening at ${address}`)
      }
    )

    const app = server.server.address()
    console.log('Address',  app);

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
