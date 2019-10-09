import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Persist from "./components/ExpensePosted/Persist/Persist";

Vue.use(Router);

export default new Router({
    mode: 'history',
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

        },
        {
            path: '/persist',
            name: 'persist',
            component: Persist,

        }
    ],
});