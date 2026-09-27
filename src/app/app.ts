import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService, Task } from './services/task.service';
import { TaskList } from './task-list/task-list';
import { CreateNewTask } from './create-new-task/create-new-task';

@Component({
  imports: [RouterOutlet, TaskList, CreateNewTask],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  loading = signal(true);
  error = signal('');

  showCreateForm = signal(false);

  openCreateForm(): void {
    this.showCreateForm.set(true);
  }

  closeCreateForm(): void {
    this.showCreateForm.set(false);
  }

  onNewTaskCreated(task: Task): void {
    this.tasks.update(tasks => [...tasks, task]);
    this.closeCreateForm();
  }

  onCreateCancelled(): void {
    this.closeCreateForm();
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err);
        this.error.set('Не удалось загрузить данные.');
        this.loading.set(false);
      }
    });
  }

  onDeleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(task => task.id != taskId));
        console.log('Задача удалена:', taskId);
      },
      error: (err) => {
        console.error("Ошибка удаления задачи:", err);
      }
    });
  }

  onStatusChanged(change: {
    id: number;
    isCompleted: boolean;
  }): void {
    const task = this.tasks().find(t => t.id === change.id);

    if (!task) {
      return;
    }

    const updatedTask: Task = {
      ...task,
      isCompleted: change.isCompleted
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (savedTask) => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === savedTask.id ? savedTask : t)
        );
        console.log('Задача обновлена:', savedTask);
      },
      error: (err) => {
        console.error('Ошибка обновления задачи:', err);
      }
    });
  }
}
