import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task as TaskEntity, TaskStatus } from './entities/Task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';



@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      status: createTaskDto.status || TaskStatus.OPEN,
    });
    return this.tasksRepository.save(task);
  }

  // Get all tasks
  async findAll(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  // Get a single task by ID
  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOneBy({ id }); // ✅ await here
    if (!task) {
      throw new NotFoundException(`Task not found with ID ${id}`);
    }
    return task;
  }

  // Update a task
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findOne(id); // will throw if not found
    Object.assign(task, updateTaskDto); // merge updated fields
    return this.tasksRepository.save(task); // TypeScript safe
  }

  // Delete a task
  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  // Optional: Update only status
  async updateStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.findOne(id); // will throw if not found
    task.status = status;
    return this.tasksRepository.save(task);
  }
}
