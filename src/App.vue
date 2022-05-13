<template>
  <div id="nav">
    <router-link to="/" v-if="userLogin">Home</router-link>
    <router-link v-if="userLogin && !adminLogin" to="/tasks"> | Tasks</router-link>
    <router-link v-if="adminLogin" :to="{name:'ManageTasks'}"> | Tasks</router-link>
    <router-link v-if="adminLogin" :to="{name:'ManageDeletedTasks'}"> | Deleted Tasks</router-link>
    <router-link v-if="adminLogin" :to="{name:'ManageUsers'}"> | Users</router-link>
    <router-link v-if="!userLogin" :to="{name:'Login'}"> | Login</router-link>
    <a v-if="userLogin || adminLogin" @click="logout" class="btn"> | Logout</a>
  </div>
  <router-view/>
</template>
<script>
import {computed} from "vue";
import {useStore} from "vuex";
import store from "./store";

export default {
  setup() {
    const store = useStore();
    const adminLogin = computed(() => store.getters["auth/isAdminLogin"])
    const userLogin = computed(() => store.getters['auth/isAuthenticated'])

    async function logout() {
      await store.dispatch('auth/logout');
    }

    return {adminLogin, userLogin, logout}

  }
}
</script>
<style>


#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
