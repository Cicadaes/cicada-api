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
    },
    {
        path: '/project/edit/:id',
        method: 'GET',
        action: 'ProjectController.getEdit',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/project/edit/:id',
        method: 'POST',
        action: 'ProjectController.postEdit',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/project/:id',
        method: 'DELETE',
        action: 'ProjectController.delete',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/interface',
        method: 'GET',
        action: 'InterfaceController.index',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/interface/add',
        method: 'GET',
        action: 'InterfaceController.getAdd',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/interface',
        method: 'POST',
        action: 'InterfaceController.postAdd',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/interface/edit/:id',
        method: 'GET',
        action: 'InterfaceController.getEdit',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/interface/edit/:id',
        method: 'POST',
        action: 'InterfaceController.postEdit',
        interceptors: ['AuthMiddleware.isAuthenticated']
    },
    {
        path: '/interface/delete/:id',
        method: 'POST',
        action: 'InterfaceController.delete',
        interceptors: ['AuthMiddleware.isAuthenticated']
    }
];