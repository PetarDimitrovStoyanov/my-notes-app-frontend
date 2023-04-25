import {createRouter, createWebHistory} from "vue-router";

import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

const routes = [
    {
        name: "dashboard",
        path: "/",
        component: DashboardPage
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
