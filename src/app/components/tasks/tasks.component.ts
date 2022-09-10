import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText='';
  editForm=false;
  newForm=false;
  
  constructor(private taskService: TaskService) { }
  myTask: Task = {
    label:"",
    completed: false
  }
  tasks: Task[] =[]; 

  resultTasks: Task[] =[]; 

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
      .subscribe(tasks => {
        this.resultTasks = this.tasks = tasks
      } )
  }

  deleteTask(id:any){
    this.taskService.delete(id).subscribe( ()=>{
      this.tasks = this.tasks.filter(task => task.id != id)
    })
  }

  persistTask(){
    this.taskService.persiste(this.myTask)
      .subscribe((task)=>{
          this.tasks = [task , ...this.tasks]
          this.resetTask();
          this.newForm= false
      });
  }

  updateTask(){
    this.taskService.update(this.myTask)
      .subscribe(() => {
        this.editForm = false
        this.resetTask();
        this.newForm= false
      })
  }

  resetTask(){
    this.myTask = {
      label : "",
      completed: false
    }
  }

  toggleCompleted(id:any,task:Task){
    this.taskService.completed(id,task.completed)
      .subscribe(() =>{
        task.completed = !task.completed
      } );
  }

  editTask(task:Task){
    this.myTask=task
    this.editForm = true
    this.newForm= true
  }

  newTask(){
    this.newForm = true
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }


}
