<template>
  <table class="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Text</th>
        <th>Votes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in ticketList" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.text }}</td>
        <td>{{ item.votes }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useTicketsStore } from "@/stores/ticket.store";
import { onMounted, ref } from "vue";
import { supabase } from "../../supabase";
import type { Ticket } from "./models";

let ticketList = ref([] as Ticket[]);

const ticketStore = useTicketsStore();

onMounted(() => {
  getTickets();

  ticketStore.$subscribe((mutation: any, state: any) => {
    getTickets();
  });
});

async function getTickets() {
  try {
    let { data: ticket, error } = await supabase.from("ticket").select("*");

    if (error) throw error;

    if (ticket) {
      ticketList.value = ticket;
    }
  } catch (error: any) {
    alert(error.message);
  }
}
</script>

<style lang="scss"></style>
