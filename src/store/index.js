import axios from 'axios';
import { createStore } from 'vuex';
import user from './user'
const store= createStore({
  modules:{
    user
  },
  state: {
tasks:[]
  },
  mutations: {
  },
  actions: {
    async fetchTasks(){
      const response=await axios.get('http://127.0.0.1:8000/api/tasks')
      console.log(response)
    }
  }
})
export default store;
