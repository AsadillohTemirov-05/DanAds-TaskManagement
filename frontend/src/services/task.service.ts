import axios from "axios";
import type { Task } from "../types/task.interface";

const API_URL = "http://localhost:3000/tasks";

export const TaskService = {
  async getAll(): Promise<Task[]> {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async update(id: number, data: Partial<Task>): Promise<Task> {
    const response = await axios.put<Task>(`${API_URL}/${id}`, data);
    return response.data;
  }
};