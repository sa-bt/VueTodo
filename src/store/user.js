import axios from 'axios';

const user = {
    namespaced: true,
    state: {
        users: []
    },
    mutations: {},
    actions: {
        async fetchUsers() {
            const response=await axios.get('http://127.0.0.1:8000/api/users')
            console.log(response)
        }
    },
    modules: {}
}

export default user;
