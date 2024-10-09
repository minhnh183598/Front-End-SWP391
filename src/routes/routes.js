import Home from '~/pages/Home/Home';
import About from '~/pages/About/About';
import FindPet from '~/pages/FindPet';
import Blog from '~/pages/Blog/Blog';
import Contact from '~/pages/Contact/Contact';
import Donate from '~/pages/Donate/Donate';
import Admin from '~/pages/Admin/Admin';
import Login from '~/pages/Login';
import Register from '~/pages/Register/Register';
import Event from '~/pages/Event';
import PetDetail from '~/pages/PetDetail';
import Volunteer from '~/pages/Volunteer';
import AdoptStep1 from '~/pages/Application/ApplicationComponents/AdoptStep1/AdoptStep1';
import Application from '~/pages/Application/Application';
import DonateSuccess from '~/pages/Donate/DonateComponents/DonateSuccess';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    // {
    //     path: '/adopt-application/:id',
    //     component: AdoptStep1,
    // },
    {
        path: '/adopt-application/:id',
        component: Application,
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
        path: '/blog',
        component: Blog,
    },
    {
        path: '/events',
        component: Event,
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
        path: '/donate-success',
        component: DonateSuccess,
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
