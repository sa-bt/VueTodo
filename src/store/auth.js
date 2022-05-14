import Swal from 'sweetalert2'
import Api from "../apis/Api";
import router from '../router'


const auth = {
    namespaced: true,
    state: {
        isAdmin: localStorage.getItem('is_admin') || false,
        authenticated: localStorage.getItem('token') || '',
        userInfo:[]
    },
    getters: {
        isAuthenticated(state) {
            return !!state.authenticated;
        },
        isAdminLogin(state) {
            return state.isAdmin;
        },
        userInfo(state){
            return state.userInfo;
        }
    },
    mutations: {
        setToken(state, data) {
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('is_admin', data.isAdmin);
            state.authenticated = true;
            router.push({name: 'Home'});

        },
        setLoggedIn(state, data) {
            console.log(data)
            state.authenticated = true;
            if (data.isAdmin) {
                state.isAdmin = true
            }
            state.userInfo=data;
        },
        deleteToken(state) {
            state.authenticated = '';
            state.isAdmin = false;
            localStorage.removeItem('token')
            localStorage.removeItem('is_admin');
            router.push({name: 'Login'});
        },
    },
    actions: {
        async login({commit}, data) {
            await Api().post('/login', data)
                .then((res) => {
                    commit('setToken', res.data.result);
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        async register({commit},form) {
            await Api().post("/register", form)
                .then((res) => {
                    commit('setToken', res.data.result);
                })
                .catch(function (error) {
                    console.log(error)
                });
        },


        async logout({commit}) {
            await Api().post("/logout")
                .then((res) => {
                    commit('deleteToken', res.data.result.token);
                })
            localStorage.removeItem('user-token')

        },

        async auth({commit}) {
            await Api().get("/user")
                .then((res) => {
                    commit('setLoggedIn',res.data.result);
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }
}
export default auth;
