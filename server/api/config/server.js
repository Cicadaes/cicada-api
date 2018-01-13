module.exports = {
    port: 4040,
    routes: [
        {
            path: '/api/user',
            method: 'POST',
            action: 'UserController.index'
        }
    ]
}