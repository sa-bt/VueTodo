<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import {useStore} from 'vuex'

export default {
  name: 'Task',
  setup() {
    const store = useStore();

    function fetchTasks() {
      store.dispatch('fetchTasks')
    }

    fetchTasks();
    return {}
  }
}
</script>
