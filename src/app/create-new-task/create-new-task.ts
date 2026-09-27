import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';

@Component({
  imports: [FormsModule],
  selector: 'app-create-new-task',
  styleUrl: './create-new-task.css',
  templateUrl: './create-new-task.html',
})
export class CreateNewTask {
  private taskService = inject(TaskService);

  taskCreated = output<Task>();
  cancelled = output<void>();
  
  newTask = {    
    title: '',
    description: '',
    isCompleted: false
  };

  createTask(): void {
    const taskToCreate = {
      title: this.newTask.title.trim(),
      description: this.newTask.description.trim(),
      isCompleted: this.newTask.isCompleted
    };  

    if (!taskToCreate.title) {
      alert('Введите название задания');
      return;
    }

    this.taskService.createTask(taskToCreate).subscribe({
      next: (createdTask) => {
        this.taskCreated.emit(createdTask);

        this.newTask = {
          title: '',
          description: '',
          isCompleted: false
        };

        console.log('Задача создана', createdTask);
      },
      error: (err) => {
        console.error('Ошибка создания задачи:', err);
      }
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
