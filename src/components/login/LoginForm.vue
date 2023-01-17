<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { supabase } from "../../supabase";

const loading = ref(false);
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;

    router.push({ name: "home" });
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <div>
        <input
          class="form-control mb-2"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
        <input
          class="form-control mb-2"
          type="password"
          placeholder="***"
          v-model="password"
        />
      </div>
      <div>
        <input
          type="submit"
          class="btn btn-primary"
          :value="loading ? 'Loading' : 'Log me in!'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>
