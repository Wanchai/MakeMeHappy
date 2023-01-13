<template>
  <div class="row mb-2">
    <div class="col-1 votes text-center">
      <i class="bi bi-caret-up-fill text-secondary d-block"></i>
      {{ ticket.votes }}
      <i class="bi bi-caret-down-fill text-secondary d-block"></i>
    </div>
    <div class="col-11">
      <h3>
        {{ ticket.title }}
      </h3>
      <p class="badge" :class="getCategoryColor(ticket.ticket_type?.code)">
        {{ ticket.ticket_type?.name }}
      </p>
      <p class="fs-7 content">
        {{ ticket.text }}
      </p>
      <p
        class="badge rounded-pill fs-8"
        :class="getStateColor(ticket.ticket_state?.code)"
      >
        {{ ticket.ticket_state?.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  ticket: null,
});

function getCategoryColor(code: string) {
  switch (code) {
    case "bug":
      return "bg-danger";
    case "feature_request":
      return "bg-warning text-dark";
    default:
      break;
  }
}
function getStateColor(code: string) {
  switch (code) {
    case "suggestion":
      return "bg-info text-dark";
    case "rejected":
      return "bg-danger";
    case "planned":
      return "bg-primary";
    case "in_progress":
      return "bg-secondary";
    case "completed":
      return "bg-success";
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.row {
  border-radius: 6px;
  background-color: #ececec;
  padding: 0.5rem;
  .votes {
    font-size: 1.3rem;
  }
}
.content {
  white-space: pre-line;
}
</style>
