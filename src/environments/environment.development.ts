/// <reference types="vite/client" />

export const environment = {
    production: import.meta.env['PRODUCTION'] === 'true' || false,
    apiUrl: import.meta.env['API_URL'] || 'http://localhost:3000/api',
    roleLogin: import.meta.env['ROLE_LOGIN'] || 'https://academia.com/roles',
    audicence: import.meta.env['AUDIENCE'] || 'https://academia.com',
    auth0Domain: import.meta.env['AUTH0_DOMAIN'],
    auth0ClientId: import.meta.env['AUTH0_CLIENT_ID']
};
