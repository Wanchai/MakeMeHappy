<script setup lang="ts">
import TicketForm from "../components/tickets/TicketForm.vue";
import TicketList from "../components/tickets/TicketList.vue";
</script>

<template>
  <main class="row">
    <div class="col-12 col-md-4">
      <TicketForm></TicketForm>
    </div>
    <div class="col-12 col-md-8">
      <TicketList></TicketList>
    </div>
  </main>
</template>
