import { TaskStatus } from "../entities/Task.entity";

export interface Task {
  id: number;             
  title: string;         
  description?: string;   
  status: TaskStatus;     
}
