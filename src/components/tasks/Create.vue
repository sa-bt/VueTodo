<template>
  <div class="row">
    <div class="col-md-12 mb-4">
      <h4>Create Task</h4>
      <form @submit.prevent="storeTask" class="row">
        <div class="col-md-4">
          <input type="text" v-model="title" class="form-control">
          <div class="form-text text-danger">
            {{ titleError }}
          </div>
        </div>
        <div class="col-md-5">
          <textarea v-model="description" id="" cols="30" class="w-100" rows="4"></textarea>
          <div class="form-text text-danger">
            {{ descriptionError }}
          </div>
        </div>
        <div class="col-auto">
          <button class="btn btn-dark">Create
          <span v-if="loading" class="spinner-border spinner-border-sm"></span> </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Create",
  setup() {
    const title = ref("");
    const loading = ref(false);
    const titleError = ref("");
    const description = ref("");
    const descriptionError = ref("");
    const store = useStore();

    async function storeTask() {
      if (title.value == "") {
        titleError.value = "Title is required";
      } else {
        titleError.value = "";
      }
      if (description.value == "") {

        descriptionError.value = "Description is required"
      } else {
        descriptionError.value = "";
      }
      if (title.value != "" && description.value != "") {
        loading.value=true;
        await store.dispatch('task/storeTask', {
          "title": title.value,
          "description": description.value
        })
        loading.value=false;
      }
    }

    return {
      title,
      titleError,
      description,
      descriptionError,
      loading,
      storeTask
    }
  }
}
</script>

<style scoped>

</style>