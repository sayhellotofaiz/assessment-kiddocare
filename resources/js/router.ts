import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // {
    //     path: "/",
    //     component: () => import("./Pages/HomeRoute.vue"),
    // },
    // {
    //     path: "/test",
    //     component: () => import("./Pages/TestRoute.vue"),
    // },
    {
        path: "/",
        component: () => import("./Pages/ReservationRoute.vue"),
    },
    {
        path: "/summary",
        component: () => import("./Pages/SummaryRoute.vue"),
    },
    {
        path: "/confirmation",
        component: () => import("./Pages/ConfirmationRoute.vue"),
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
