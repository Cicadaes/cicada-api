module.exports = [
    {
        path: '/',
        method: 'GET',
        action: 'HomeController.index'
    },
    {
        path: '/login',
        method: 'GET',
        action: 'LoginController.index'
    },
    {
        path: '/signup',
        method: 'GET',
        action: 'SignupController.index'
    }
];