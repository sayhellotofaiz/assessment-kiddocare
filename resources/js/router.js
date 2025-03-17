import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("./Pages/HomeRoute.vue"),
    },
    {
        path: "/test",
        component: () => import("./Pages/TestRoute.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("./Pages/404.vue"),
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
