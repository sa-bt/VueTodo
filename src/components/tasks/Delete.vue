<template>
  <div>
    <span  @click="deleteTask" class="bi bi-trash-fill pointer-event ms-2" style="font-size: 22px"></span>

    <span v-if="loading" class="spinner-border spinner-border-sm"></span>

  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Delete",
  props: ["id"],
  setup(props) {
    const loading = ref(false);
    const store = useStore();

    async function deleteTask() {
      loading.value = true;
      console.log(props.id)
      await store.dispatch('task/deleteTask', props.id)
      loading.value = false;
    }

    return {
      loading,
      deleteTask
    }
  }
}
</script>

<style scoped>

</style>