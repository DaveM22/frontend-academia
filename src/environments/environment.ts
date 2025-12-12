/// <reference types="vite/client" />

export const environment = {
    production: import.meta.env['PRODUCTION'],
    apiUrl: import.meta.env['API_URL'],
    roleLogin: import.meta.env['ROLE_LOGIN'],
    audicence: import.meta.env['AUDIENCE'],
    auth0Domain: import.meta.env['AUTH0_DOMAIN'],
    auth0ClientId: import.meta.env['AUTH0_CLIENT_ID']
};
