<template>
  <div>

    <div v-if="loading" class="container mt-5">
      <div class="row justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>


    <div v-else class="container">
      <Create/>
      <hr>
      <div class="row g-3 mt-4">
        <div v-for="task in tasks" :key="task.id" class="col-md-4">
          <div class="card">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div class="cord-body" :class="{'bg-light':task.completed}">
                <del v-if="task.completed">{{ task.title }}</del>
                <div v-else>{{ task.title }}</div>
              </div>
              <div class="d-flex align-items-center">
                <Update :task="task"/>
                <Delete :id="task.id"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {useStore} from 'vuex'
import {computed, ref} from "vue";
import Create from "../components/tasks/Create";
import Update from "../components/tasks/Update";
import Delete from "../components/tasks/Delete";

export default {
  name: 'Task',
  components: {
    Create,
    Update,
    Delete
  },
  setup() {
    const loading = ref(false)
    const store = useStore();
    const tasks = computed(() => store.getters["task/allTasks"])

    async function fetchTasks() {
      loading.value = true;
      await store.dispatch('task/fetchTasks');
      loading.value = false;
    }

    fetchTasks();
    console.log(tasks)
    return {tasks, loading}
  }
}
</script>
