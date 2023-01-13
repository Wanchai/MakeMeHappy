<template>
  <nav class="nav">
    <RouterLink class="nav-link" to="/">Home</RouterLink>
    <RouterLink class="nav-link" to="/about">About</RouterLink>

    <span v-if="!user?.email">
      <RouterLink class="nav-link" to="/login">Login</RouterLink>
    </span>
    <span v-else class="nav-link">{{ user?.email }}</span>
  </nav>
</template>

<script setup lang="ts">
import { supabase } from "@/supabase";
import { RouterLink } from "vue-router";

const user = (await supabase.auth.getSession()).data.session?.user;
</script>

<style></style>
