<template>
  <div class="container">
    <h1>Task Manager</h1>

    <TaskCardList
      :tasks="tasks"
      @delete="deleteTask"
      @edit="editTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Task } from "../types/task.interface";
import { TaskService } from "../services/task.service";

const tasks = ref<Task[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

const loadTasks = async () => {
  try {
    loading.value = true;
    tasks.value = await TaskService.getAll();
  } catch (err) {
    error.value = "Failed to load tasks";
  } finally {
    loading.value = false;
  }
};

const deleteTask = async (id: number) => {
  await TaskService.delete(id);
  tasks.value = tasks.value.filter(t => t.id !== id);
};

const editTask = (task: Task) => {
  console.log("Editing:", task);
};

onMounted(loadTasks);
</script>