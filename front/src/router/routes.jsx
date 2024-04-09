
import Home from "../pages/Home";
import Object from "../pages/Object";

export const privateRoutes = [
    // {path: '/', component: Project, exact: true},
    {path: '/', component: Home, exact: true},
    {path: '/object/:id', component: Object, exact: true},

    // {path: '/:id', component: Home, exact: true},
]
// export const publicRoutes = [
//     {
//     path: '/', component: Auth, exact: true},
// ]
