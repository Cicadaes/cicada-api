module.exports = [
    {
        path: '/',
        method: 'GET',
        action: 'HomeController.index',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/login',
        method: 'GET',
        action: 'UserController.getLogin'
    },
    {
        path: '/signup',
        method: 'GET',
        action: 'UserController.getSignup'
    }
];