<template>
  <div class="row justify-content-md-center">
    <div class="card col-md-5">
      <div class="card-body">
        <h5 class="card-title">Register</h5>
        <div class="mb-3">
          <label for="exampleInputName" class="form-label"
          >Name</label
          >
          <input
              type="text"
              class="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              v-model="name"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
          >Email address</label
          >
          <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1Confirmation" class="form-label">Password Confirmation</label>
          <input
              type="password"
              class="form-control"
              id="exampleInputPassword1Confirmation"
              v-model="password_confirmation"
          />
        </div>
        <div class="mb-3">
          <button
              type="submit"
              :disabled="isLoading"
              class="btn btn-primary"
              @click="register"
          >
            Register
          </button>
        </div>

        <div class="mb-3">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import {createRouter as $router} from "vue-router";

export default {
  setup() {
    const store = useStore();
    const name = ref("");
    const email = ref("");
    const isLoading = ref(false);
    const password = ref("");
    const password_confirmation = ref("");
    const register = async () => {
      isLoading.value = true;
      await store.dispatch('auth/register', {
        "name": name.value,
        "email": email.value,
        "password": password.value,
        "password_confirmation": password_confirmation.value,
        "device_name": 'web',
      })
          .then(() => {
            // store.dispatch('auth/auth');
            isLoading.value = false;

          })
          .catch((error) => {
            isLoading.value = false;
            console.log(error)
          });
    };
    return {
      name, email, password, password_confirmation, isLoading, register
    }

  }
}
</script>
