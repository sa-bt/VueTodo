<template>
<div class="container">
  <table class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Count Tasks</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.id">
      <th scope="row">{{ user.id }}</th>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{user.countTasks}}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Index",
  setup() {
    const loading = ref(false)
    const store = useStore();
    const users = computed(() => store.getters["user/allUsers"])

    async function fetchUsers() {
      loading.value = true;
      await store.dispatch('user/fetchUsers');
      loading.value = false;
    }

    fetchUsers();
    console.log(users)
    return {users, loading}
  }
}
</script>

<style scoped>

</style>