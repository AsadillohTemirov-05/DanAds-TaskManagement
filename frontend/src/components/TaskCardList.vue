<template>
  <div>
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete="emit('delete', $event)"
      @edit="emit('edit', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from "../types/task.interface";
import TaskCard from "./TaskCard.vue";

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", task: Task): void;
}>();
</script>