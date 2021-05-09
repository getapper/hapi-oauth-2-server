const add = require('date-fns/add');
const toDate = require('date-fns/toDate');

module.exports = (server) => {
    return {
        getAccessToken: async () => {
            
            return { user: {}, accessTokenExpiresAt: toDate(add(new Date(), { days: 3 })) }
        },
        getAuthorizationCode: async code => {
            return {
                code: 'be6e365e9f29c19e631078e8e376326bdf086576',
                expiresAt: toDate(add(new Date(), { days: 3 })),
                scope: 'test',
                client: { id: 'test' },
                user: {}
            };
        },
        getClient: async (clientId, clientSecret) => {
            return {
                id: clientId,
                clientSecret,
                redirectUris: ['/ok'],
                grants: [
                    "password",
                    "authorization_code",
                    "refresh_token"
                ]
            }
        },
        saveAuthorizationCode: async (code, client, user) => {
            return {
                ...code,
                client: { id: 'test' },
                user: { id: user.userId }
            }
        },
        saveToken: async (token, client, user) => {
            return {
                ...token,
                client: { id: 'test' },
                user: {}
            }
        },
        getUser: async (username, password) => {
            return { user: {} }
        },
        revokeAuthorizationCode: async code => {
            return true
        }
    }
}
