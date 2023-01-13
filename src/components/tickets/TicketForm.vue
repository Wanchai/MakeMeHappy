<script setup lang="ts">
import { useTicketsStore } from "@/stores/ticket.store";
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import type { TicketState } from "./models";

const form = ref({
  title: "",
  description: "",
  category: "",
});

const states = ref([] as TicketState[]);
const ticketStore = useTicketsStore();

onMounted(() => {
  init();
});

async function init() {
  let { data: state } = await supabase.from("ticket_type").select("*");
  states.value = state ?? [];
}

async function create(event: any) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError !== null) {
    throw sessionError;
  }

  const { category, description, title } = event.target.elements;

  const { error } = await supabase.from("ticket").insert([
    {
      title: title.value,
      text: description.value,
      user_mail: session?.user.email,
      project: "b16e15c1-d6af-44ca-8074-4e56c5e1b6d0",
      state: "suggestion",
      category: category.value,
    },
  ]);

  if (error != null) {
    throw error;
  }

  event.target.reset();
  ticketStore.needUpdate();
}
</script>

<template>
  <form @submit.prevent="create">
    <label for="title" class="form-label">Title</label>
    <input required id="title" class="form-control mb-3" v-model="form.title" />
    <label for="description" class="form-label">Description</label>
    <textarea
      required
      id="description"
      rows="6"
      class="form-control mb-3"
      v-model="form.description"
    ></textarea>

    <label for="category">Category</label>
    <select
      required
      v-model="form.category"
      class="form-select mt-2"
      id="category"
    >
      <option v-for="state in states" :value="state.code" :key="state.code">
        {{ state.name }}
      </option>
    </select>

    <button class="btn btn-primary mt-3" type="submit">Create</button>
  </form>
</template>
<style></style>
