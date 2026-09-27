import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Task
{
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5071/api/tasks';

    getTasks() {
        return this.http.get<Task[]>(this.apiUrl);
    }

    updateTask(task: Task) {
        return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
    }

    deleteTask(id: number) {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`
        );
    }

    createTask(task: Omit<Task, 'id' | 'createdAt'>) {
        return this.http.post<Task>(this.apiUrl, task);
    }
}
