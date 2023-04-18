import Fastify, {
  FastifyInstance,
  FastifyReply, FastifyRequest,
  RouteShorthandOptions
} from 'fastify'
import { join } from 'path';

const port: number = parseInt(process?.env?.PORT || "1338", 10)
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

server.get('/', opts, async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.sendFile('index.html')
})

server.get('/ping', opts, async () => {
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

    const address = server.server.address()
    console.log(address);

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
