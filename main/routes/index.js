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
        path: '/login',
        method: 'POST',
        action: 'UserController.postLogin'
    },
    {
        path: '/signup',
        method: 'GET',
        action: 'UserController.getSignup'
    },
    {
        path: '/signup',
        method: 'POST',
        action: 'UserController.postSignup'
    },
    {
        path: '/logout',
        method: 'GET',
        action: 'UserController.logout'
    },
    {
        path: '/user',
        method: 'GET',
        action: 'UserController.index',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/project',
        method: 'GET',
        action: 'ProjectController.index',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/project/add',
        method: 'GET',
        action: 'ProjectController.getAdd',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/project/add',
        method: 'POST',
        action: 'ProjectController.postAdd',
        interceptors: ['AuthMiddleware.isAuthenticated']
    }
];