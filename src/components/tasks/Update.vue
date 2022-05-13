<template>
  <div>
    <span v-if="task.completed" @click="updateTask(task)" class="bi bi-check-all " style="font-size: 22px"></span>
    <span v-else @click="updateTask(task)" class="bi bi-check " style="font-size: 22px"></span>

    <span v-if="loading" class="spinner-border spinner-border-sm"></span>

  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Update",
  props: ['task'],
  setup() {
    const loading = ref(false);
    const store = useStore();

    async function updateTask(task) {
      loading.value = true;
      await store.dispatch('task/updateTask', task)
      loading.value = false;
    }

    return {
      loading,
      updateTask
    }
  }
}
</script>

<style scoped>

</style>