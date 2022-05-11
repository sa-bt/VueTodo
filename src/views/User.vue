<template>
  <div class="home">
    <h1>Users</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import {useStore} from 'vuex'
import { mapGetters,  mapActions} from 'vuex'

export default {
  name: 'User',
  setup() {

    const store = useStore();

    function fetchUsers() {
      store.dispatch('user/fetchUsers')
    }

    fetchUsers();
    return {}
  }
}
</script>
