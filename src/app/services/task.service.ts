import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "http://localhost:3000/tasks";
  
  constructor(private http : HttpClient) { }

  findAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  delete(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persiste(task:Task){
    return this.http.post<Task>(this.apiUrl,task);
  }

  update(task:Task){
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }

  completed(id:number,completed:boolean){
    return this.http.patch(`${this.apiUrl}/${id}`, {completed : !completed});
  }

}
