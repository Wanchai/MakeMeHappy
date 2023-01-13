<script setup lang="ts">
import HeaderMenu from "./components/layout/HeaderMenu.vue";
</script>

<template>
  <div class="container">
    <header>
      <Suspense>
        <HeaderMenu></HeaderMenu>
      </Suspense>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
