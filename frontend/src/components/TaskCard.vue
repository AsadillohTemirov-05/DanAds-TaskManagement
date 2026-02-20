<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>

    <span :class="task.status">
      {{ task.status }}
    </span>

    <div class="actions">
      <button @click="$emit('edit', task)">Edit</button>
      <button @click="$emit('delete', task.id)">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../types/task.interface';

// import type { Task } from "@/types/task.interface";

defineProps<{
  task: Task;
}>();

defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", task: Task): void;
}>();
</script>

<style scoped>
.task-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>