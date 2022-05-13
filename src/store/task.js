import axios from 'axios';
import Swal from 'sweetalert2'
import Api from "../apis/Api";

const task = {
    namespaced: true,
    state: {
        tasks: [],
        deletedTasks:[]
    },
    getters: {
        allTasks(state) {
            return state.tasks;
        },
        getDeletedTasks(state) {
            return state.deletedTasks;
        }
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setDeletedTasks(state, tasks) {
            state.deletedTasks = tasks;
        },
        newTask(state, task) {
            state.tasks.unshift(task);
        },
        updateTask(state, updateTask) {
            let id = state.tasks.findIndex(task => task.id === updateTask.id);
            if (id !== -1) {
                state.tasks.splice(id, 1, updateTask);
            }
            console.log(state.tasks)
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(task => task.id !== id);
        }
    },
    actions: {
        async fetchTasks({commit}) {
            await Api().get('/tasks').then((response) => {
                    commit('setTasks', response.data.result);

                }
            ).catch((error) =>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            )
        },

        async fetchAllTasks({commit}) {
            await Api().get('/admin/tasks').then((response) => {
                    commit('setTasks', response.data.result);

                }
            ).catch((error) =>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            )
        },

        async fetchAllDeletedTasks({commit}) {
            await Api().get('/admin/tasks/deleted').then((response) => {
                    commit('setDeletedTasks', response.data.result);
                }
            ).catch((error) =>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            )
        },

        async storeTask({commit}, values) {
            await Api().post('/tasks', values).then((response) => {
                commit('newTask', response.data.result);
                Swal.fire({
                    icon: 'success',
                    title: 'Task added',
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

        async updateTask({commit}, task) {
            console.log(task);
            await Api().put(`/tasks/${task.id}`, {
                "completed": !task.completed,
            }).then((response) => {
                commit('updateTask', response.data.result);
                Swal.fire({
                    icon: 'success',
                    title: 'Task updated',
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

        async deleteTask({commit}, id) {
            await Api().delete(`/tasks/${id}`).then((response) => {
                commit('deleteTask', id);
                Swal.fire({
                    icon: 'success',
                    title: 'Task deleted',
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

export default task;
