<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
        <br>
          <span v-if="user.isAdmin" class="text-info">Role: Admin</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {computed, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: 'Home',
  components: {},
  setup() {
    const loading = ref(false)
    const store = useStore();
    const user = computed(() => store.getters['auth/userInfo']);

    async function fetchUser() {
      loading.value = true;
      await store.dispatch('auth/auth');
      loading.value = false;
    }

    console.log(user)
    fetchUser();
    return {user, loading}
  }
}
</script>
