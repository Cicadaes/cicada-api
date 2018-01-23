module.exports = [
    {
        path: /\/api\/(.+)$/,
        method: 'GET',
        action: 'ApiController.index'
    }
];