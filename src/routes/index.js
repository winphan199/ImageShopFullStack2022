import Home from '~/pages/Home';
import Upload from '~/pages/Upload';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/upload', component: Upload },
    // { path: '/upload', component: Upload, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
