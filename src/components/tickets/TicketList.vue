<template>
  <TicketLine
    v-for="item in ticketList"
    :ticket="item"
    :key="item.id"
  ></TicketLine>
</template>

<script setup lang="ts">
import { useTicketsStore } from "@/stores/ticket.store";
import { onMounted, onUnmounted, ref } from "vue";
import { supabase } from "../../supabase";
import type { Ticket } from "./models";
import TicketLine from "./TicketLine.vue";

let ticketList = ref([] as Ticket[]);

const ticketStore = useTicketsStore();
const PAGE_SIZE = 20;
let ticketPage = 0;
let ticketCount = 0;
let loadingProgress = false;

onMounted(() => {
  getTickets();
  window.addEventListener("scroll", handleScroll);

  ticketStore.$subscribe(() => {
    ticketPage = 0;
    getTickets();
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  if (
    window.scrollY + window.innerHeight * 2 > document.body.clientHeight &&
    !loadingProgress &&
    ticketList.value.length < ticketCount
  ) {
    loadingProgress = true;
    ticketPage = ticketPage + PAGE_SIZE;
    getTickets();
  }
}

async function getTickets() {
  try {
    let { data, error, count } = await supabase
      .from("ticket")
      .select("*, ticket_state (code, name), ticket_type(code, name)", {
        count: "exact",
      })
      .order("votes", { ascending: false })
      .range(ticketPage, ticketPage + PAGE_SIZE);

    if (error) throw error;

    if (data) {
      ticketCount = count ?? 0;
      ticketList.value = [...ticketList.value, ...data] as Ticket[];
    }
    loadingProgress = false;
  } catch (error: any) {
    alert(error.message);
    loadingProgress = false;
  }
}
</script>

<style lang="scss"></style>
