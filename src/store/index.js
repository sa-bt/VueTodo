import axios from 'axios';
import { createStore } from 'vuex';
import user from './user'
import task from "./task";
import auth from "./auth";
const store= createStore({
  modules:{
    user,
    task,
    auth
  },

})
export default store;
