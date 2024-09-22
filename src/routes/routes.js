import Home from '~/pages/Home/Home';
import About from '~/pages/About/About';
import FindPet from '~/pages/FindPet';
import Rehome from '~/pages/Rehome/Rehome';
import Blog from '~/pages/Blog/Blog';
import Contact from '~/pages/Contact/Contact';
import Donate from '~/pages/Donate/Donate';
import Admin from '~/pages/Admin/Admin';
import Login from '~/pages/Login';
import Register from '~/pages/Register/Register';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about-us',
        component: About,
    },
    {
        path: '/find-a-pet',
        component: FindPet,
    },
    {
        path: '/rehome-pet',
        component: Rehome,
    },
    {
        path: '/blog',
        component: Blog,
    },
    {
        path: '/contact',
        component: Contact,
    },
    {
        path: '/donate',
        component: Donate,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: Register,
        layout: null,
    },
];

const privateRoutes = [
    {
        path: '/admin',
        component: Admin,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
