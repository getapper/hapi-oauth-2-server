# hapi-oauth2-server-plugin [![Build Status](https://travis-ci.org/getapper/hapi-oauth-2-server.svg?branch=master)](https://travis-ci.org/getapper/hapi-oauth-2-server)


Complete, compliant and well tested module for implementing an OAuth2 Server/Provider with [hapi](https://github.com/hapijs/hapi) in [node.js](http://nodejs.org/).

This is the hapi wrapper for [oauth2-server](https://github.com/oauthjs/node-oauth2-server).

## Installation

    $ npm install hapi-oauth2-server-plugin

## Quick Start

The wrapper is actually a plugin for Hapi >= 17.

To use it you just need to register it like every Hapi plugin

```js
  const HapiOAuth2Server = require('hapi-oauth2-server-plugin');

...

  server.register({
    plugin: HapiOAuth2Server,
    options: {
      model
    }
  });
```

where model is a [oauth2-server model object](https://oauth2-server.readthedocs.io/en/latest/model/overview.html).

The plugin decorates Hapi requests with a `oauth` object that contains the 3 oauth2-server main methods [authenticate](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html?highlight=grant_type#authenticate-request-response-options-callback), [authorize](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html?highlight=grant_type#authorize-request-response-options-callback) and [token](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html?highlight=grant_type#token-request-response-options-callback).

The methods accept an Hapi request object and an optional options object and return what the original and respective oauth2-server method provides.

Here follows a quick and easy example:

```js
  server.route({
    method: 'GET',
    path: '/authenticate',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server.plugins['hapi-oauth-2-server']
        try {
          return await oauth.authenticate(req)
        } catch (e) {
          return h.response().code(401)
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/authorize',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server.plugins['hapi-oauth-2-server']
        try {
          return await oauth.authorize(req)
        } catch (e) {
          return h.response().code(401)
        }
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/token',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server.plugins['hapi-oauth-2-server']
        try {
          return await oauth.token(req)
        } catch (e) {
          console.log(e)
          return h.response().code(401)
        }
      }
    }
  })
```

## Test

The repository offers also an out-of-the-box example and unit tests inside the `test` folder.

## What's next

Starting from this you can adapt it to your current authentication and authorization Hapi plugin or create your own by wrapping it as well in a new one. 
