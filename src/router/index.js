import {createRouter, createWebHistory} from "vue-router";
import store from '../store/store';
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

const routes = [
    {
        name: "dashboard",
        path: "/",
        component: DashboardPage,
        meta: {
            roles: ['User']
        }
    },
    {
        path: '/dashboard',
        redirect: '/'
    },
    {
        name: "login",
        path: "/login",
        component: LoginPage
    },
    {
        name: "not-found",
        path: "/:pathMatch(.*)*",
        component: NotFoundPage
    },
    {
        path: "/:catchAll(.*)",
        component: NotFoundPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

function hasRoles(requiredRouteRole) {
    if (requiredRouteRole && requiredRouteRole.length > 0) {
        return store.getters.getUser.roles.some(role => requiredRouteRole.includes(role.name))
    }

    return true;
}

router.beforeEach(async (to, from, next) => {
    if (to.path.includes("/login")) {
        await store.dispatch("setUser", {
            id: null,
            email: "",
            fullName: "",
            roles: []
        });
        await store.dispatch("setToken", null);
        await store.dispatch("setSelectedNote", null);
        await store.dispatch("setNotes", []);
    }


    if (to.meta && hasRoles(to.meta.roles)) {
        next();
    } else {
        next("/login")
    }
})

export default router;
