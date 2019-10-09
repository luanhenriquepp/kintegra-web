import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,

        }
    ],
});