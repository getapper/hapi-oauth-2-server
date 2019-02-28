const Hapi = require('hapi')
const HapiOAuth2Server = require('../')

module.exports = async model => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register({
    plugin: HapiOAuth2Server,
    options: {
      model
    }
  })

  server.route({
    method: 'GET',
    path: '/authenticate',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server.plugins['hapi-oauth-2-server']
        try {
          await oauth.authenticate(req)
          return 'ok'
        } catch (e) {
          return h.response().code(401)
        }
      }
    }
  })

  return server
}
