import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user';

const requireAuth = async(to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingUserSession = true;
    const user = await userStore.currentUser();
    userStore.loadingUserSession = false;
    if (user) {
        if (user.uid && user.uid !== userStore.userData.uid) {
            userStore.storeUserData(
                user.email, 
                user.displayName, 
                user.uid, 
                user.accessToken, 
                user.reloadUserInfo.passwordHash,
                user.reloadUserInfo.lastLoginAt
            );
        }
        next();
    } else {
        next('/login');
    }
}

const routes = [
    {
        path:'/',
        name:'home',
        beforeEnter: requireAuth,
        component: () => import('../views/HomeView.vue')
    },
    {
        path:'/edit/:id',
        name:'edit',
        beforeEnter: requireAuth,
        component: () => import('../views/EditView.vue')
    },
    {
        path:'/login',
        name:'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path:'/register',
        name:'register',
        component: () => import('../views/RegisterView.vue')
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: "active",
    routes
});

export default router;