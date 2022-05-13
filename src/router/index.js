import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Task from "../views/Task";
import User from "../views/User";
import Login from "../views/Login";
import store from "../store";
import ManageUserIndex from "../views/manage/user/Index";
import ManageTaskIndex from "../views/manage/task/Index";
import DeleteTasksList from "../views/manage/task/DeleteTasksList";

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters['auth/isAuthenticated']) {
        next()
        return
    }
    next('/')
}
const ifAuthenticated = (to, from, next) => {
    if (store.getters['auth/isAuthenticated'] && !store.getters['auth/isAdminLogin']) {
        next()
        return
    }
    next('/login')
}
const isAdmin = (to, from, next) => {
    if (store.getters['auth/isAuthenticated'] && store.getters['auth/isAdminLogin']) {
        next()
        return
    }
    next('/login')
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: Task,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/admin/users',
        name: 'ManageUsers',
        component: ManageUserIndex,
        beforeEnter: isAdmin,
    },
    {
        path: '/admin/tasks',
        name: 'ManageTasks',
        component: ManageTaskIndex,
        beforeEnter: isAdmin,
    },
    {
        path: '/admin/deleted-tasks',
        name: 'ManageDeletedTasks',
        component: DeleteTasksList,
        beforeEnter: isAdmin,
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
// router.beforeEach((to, from, next) => {
//    if(to.matched.some(record => record.meta.adminAuth)) {
//     if (!store.getters['auth/isAdminLogin']) {
//       next({ name: 'Login' })
//       // store.dispatch('auth/logout');
//       return
//     } else {
//       next() // go to wherever I'm going
//     }
//   }
// })
export default router
