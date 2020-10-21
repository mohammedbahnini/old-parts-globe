const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

const nextEnv = require('next-env');
const dotnevLoad = require('dotenv-load');
dotnevLoad();

const withNextEnv = nextEnv();

const env = withNextEnv({
    ...process.env
})();
//console.log(env);

const nextSettings = {
    exportTrailingSlash: true,
    exportPathMap: function () {
        return {
            '/': { page: '/' },
        };
    }
};

/*const nextConfig = {
    env: {
        api: 'http://localhost:8000/api',
        api_2: 'http://localhost',
        PUBLISHABLE_KEY: 'pk_test_51GuNlgK7kyPZtMq547rhppQ0KeiOs6o49MZkaLaRTT6zZOuhNfp4BSJHEVJDTeJAGzIfgCiCtOtvfXWc1R1V2HDx00Oixzal9g',
        PORT: 8000,
        ENV: 'dev',
        SESSION_SECRET: '12df36FG3xDD334f',
        GMAIL_CLIENT_ID: '591889027671-jhjq0oec8aif3v96ma1jri5o8269kctf.apps.googleusercontent.com',
        GMAIL_CLIENT_SECRET: 'g2xwpODdqJtxP2er5xYJZhpJ',
        GMAIL_REDIRECT_URI: 'https://developers.google.com/oauthplayground',
        GMAIL_REFRESH_TOKEN: '1//04rWKXQ2kb4N9CgYIARAAGAQSNwF-L9IriJf7JXSUABCwDbmquzKPqGbrML_M6qZXqxFOegzOyQQKgAjBiwmuyCcX3RfG2WdQtq4',
        GMAIL_ACCESS_TOKEN: 'ya29.a0AfH6SMBz9HGEtwG0tW5xXGaZyqWjNDQLyDSzQOvliJT765mYE4gWaHsoQ_7YWqSKBL1WFYbSDE2P_WSWCrEhoW-k08ZtPThnPXECXAubpJs8wQsof-ngElrz4B-5Dy-hRa6iVjZFlWDW70MwOjagSiaptLaTVjOxTvY',
        WEBSITE_ORIGINE: 'http://localhost:8000'
    }
}*/
const nextConfig = {
    env: {
        PORT: env.PORT,
        HOST: env.HOST,
        API: `${env.HOST}/api`,
        ENV: 'production',
        PUBLISHABLE_KEY: env.PUBLISHABLE_KEY,
        SESSION_SECRET: env.SESSION_SECRET,
        GMAIL_CLIENT_ID: env.GMAIL_CLIENT_ID,
        GMAIL_CLIENT_SECRET: env.GMAIL_CLIENT_SECRET,
        GMAIL_REDIRECT_URI: env.GMAIL_REDIRECT_URI,
        GMAIL_REFRESH_TOKEN: env.GMAIL_REFRESH_TOKEN,
        GMAIL_ACCESS_TOKEN: env.GMAIL_ACCESS_TOKEN,
        WEBSITE_ORIGINE: env.WEBSITE_ORIGINE
    }
}

module.exports = withPlugins([[withSass(), withImages()]], nextConfig);
