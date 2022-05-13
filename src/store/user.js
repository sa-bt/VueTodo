import Swal from 'sweetalert2'
import Api from "../apis/Api";

const user = {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        allUsers(state) {
            return state.users;
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        newUser(state, user) {
            state.users.unshift(user);
        },
        updateUser(state, updateUser) {
            let id = state.users.findIndex(user => user.id === updateUser.id);
            if (id !== -1) {
                state.users.splice(id, 1, updateUser);
            }
            console.log(state.users)
        },
        deleteUser(state, id) {
            state.users = state.users.filter(user => user.id !== id);
        }
    },
    actions: {
        async fetchUsers({commit}) {
            await Api().get('/admin/users').then((response) => {
                    commit('setUsers', response.data.result);
                }
            ).catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            })
        },

        async storeUser({commit}, values) {
            await Api().post('/users', values).then((response) => {
                commit('newUser', response.data.result);
                Swal.fire({
                    icon: 'success',
                    title: 'User added',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top',
                    showCloseButton: true
                });
            }).catch((error) =>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            )
        },

        async updateUser({commit}, user) {
            console.log(user);
            await Api().put(`/users/${user.id}`, {
                "completed": !user.completed,
            }).then((response) => {
                commit('updateUser', response.data.result);
                Swal.fire({
                    icon: 'success',
                    title: 'User updated',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top',
                    showCloseButton: true
                });
            }).catch((error) =>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            )
        },

        async deleteUser({commit}, id) {
            await Api().delete(`/users/${id}`).then((response) => {
                commit('deleteUser', id);
                Swal.fire({
                    icon: 'success',
                    title: 'User deleted',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top',
                    showCloseButton: true
                });
            }).catch((error) =>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            )
        },
    },
}

export default user;
