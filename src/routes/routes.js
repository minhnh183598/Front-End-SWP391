import Home from '~/pages/Home/Home';
import About from '~/pages/About/About';
import FindPet from '~/pages/FindPet';
import Adopt from '~/pages/Adopt/Adopt';
import Blog from '~/pages/Blog/Blog';
import Contact from '~/pages/Contact/Contact';
import Donate from '~/pages/Donate/Donate';
import Admin from '~/pages/Admin/Admin';
import Login from '~/pages/Login';
import Register from '~/pages/Register/Register';
import Event from '~/pages/Event';
import PetDetail from '~/pages/PetDetail';
import Volunteer from '~/pages/Volunteer';
import BlogDetail from '~/pages/BlogDetail';
import EventDetail from '~/pages/EventDetail';

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
        path: '/pet-detail/:id',
        component: PetDetail,
    },
    {
        path: '/adopt-pet',
        component: Adopt,
    },
    {
        path: '/blog',
        component: Blog,
    },
    {
        path: '/blog-detail',
        component: BlogDetail,
    },
    {
        path: '/events',
        component: Event,
    },
    {
        path: '/event-detail',
        component: EventDetail,
    },
    {
        path: '/volunteer',
        component: Volunteer,
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
