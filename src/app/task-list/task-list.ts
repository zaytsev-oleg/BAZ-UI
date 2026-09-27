import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../services/task.service';

@Component({
  imports: [DatePipe],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input<Task[]>([]);

  statusChanged = output<{
    id: number;
    isCompleted: boolean;
  }>();

  onStatusChanged(taskId: number, event: Event): void {
    const checkBox = event.target as HTMLInputElement;

    this.statusChanged.emit({
      id: taskId,
      isCompleted: checkBox.checked      
    });
  }

  deleteRequested = output<number>();

  onDelete(taskId: number): void {
    this.deleteRequested.emit(taskId);
  }
}
