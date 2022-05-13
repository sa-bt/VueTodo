<template>
  <div class="container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Creator</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <th scope="row">{{ task.id }}</th>
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>{{task.user}}</td>
        <td>
          <span class="badge bg-success" v-if="task.completed">Done</span>
          <span class="badge bg-info" v-else>Doing</span></td>
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
    const tasks = computed(() => store.getters["task/allTasks"])

    async function fetchTasks() {
      loading.value = true;
      await store.dispatch('task/fetchAllTasks');
      loading.value = false;
    }

    fetchTasks();
    console.log(tasks)
    return {tasks, loading}
  }
}
</script>

<style scoped>

</style>