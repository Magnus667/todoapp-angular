import { Response } from '@angular/http';
import { TodoService } from './services/todo.service';
import { ToDo } from './models/todo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private todoService: TodoService ){}

  // declaring new Todo object and initializing it
  public newTodo: ToDo = new ToDo();

  // an empty list for the visible todo list
  todoList: ToDo[];
  editTodos: ToDo[] = [];

  create(){
    this.todoService.createTodo(this.newTodo)
    .subscribe((res => {
      this.todoList.push(res.data);
      this.newTodo = new ToDo();
    }))
  }

  editTodo(todo: ToDo){
    console.log(todo);
    if(this.todoList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo);
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1);
        this.todoService.editTodo(todo)
        .subscribe(res => {
          console.log('update succesful');
        }, err =>{
          this.editTodo(todo);
          console.error('update failed');
        })
      }
    }
  }

  doneTodo(todo: ToDo){
    todo.status = 'Done';
    this.todoService.editTodo(todo)
    .subscribe(res => {
      console.log('update succesful');
    }, err => {
      this.editTodo(todo);
      console.error('update failed')
    })
  }

  submitTodo(event, todo: ToDo){
    if(event.keyCode == 13){
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: ToDo){
    this.todoService.deleteTodo(todo._id)
    .subscribe( res => {
      this.todoList.splice(this.todoList.indexOf(todo), 1);
    })
  }

  ngOnInit(): void {
    this.todoService.getTodos()
    .subscribe(todos => {
      this.todoList = todos;
      console.log(todos);
    })
  }


  title = 'app';
}
