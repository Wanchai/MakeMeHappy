import type { Ticket } from "@/components/tickets/models";
import { defineStore } from "pinia";

export const useTicketsStore = defineStore({
  id: "ticket",

  state: () => ({
    rawItems: [] as Ticket[],
    needRefresh: false,
  }),

  actions: {
    addItem(ticket: Ticket) {
      this.rawItems.push(ticket);
    },
    needUpdate() {
      this.needRefresh = !this.needRefresh;
    },
  },
});
