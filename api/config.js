module.exports = {
    PORT: 8080,
    HTTPS_PORT: 9090,
    DB_URL: `mongodb://localhost/nyanpasu`,
    session: {
        secret: ['nyanpasu lol kekeekekekekek', '04ab4cd50aa14c18d001fe46d8dda70c4a5f4c972daf296b972221cf0371a438b521f0a79bf0b8fdebcd38fa503e0a4e2f148368e087d2a992b9cca6491fbc78', 'd7256f5b14f87e71f998f946060c1ebf2667292b38049be8f6074586ad3cf8dc'],
        key: 'nyan pas pasu kek keyuo',
        cookie: {
            path: '/',
            httpOnly: true,
//            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    }
}