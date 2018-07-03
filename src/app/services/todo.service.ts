import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import ToDo from '../models/todo.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';




@Injectable()
export class TodoService {
    api_url = 'http://localhost:3000';
    todoUrl = `${this.api_url}/api/todos`;

    constructor( private http: HttpClient ){}

    // create todo, takes a Todo Object
    createTodo(todo: ToDo): Observable<any>{
        return this.http.post(`${this.todoUrl}`, todo);
    }

    // read todos, takes no arguments
    getTodos(): Observable<ToDo[]>{
        return this.http.get(this.todoUrl).map(res  => {
          //Maps the response object sent from the server
            
          return res["data"].docs as ToDo[];
        });
      }

    editTodo(todo: ToDo){
        let editUrl = `${this.todoUrl}`;
        return this.http.put(editUrl, todo);
    }

    deleteTodo(id: string): any{
        let deleteUrl = `${this.todoUrl}/${id}`;
        return this.http.delete(deleteUrl)
        .map(res => {
            return res;
        });
    }

    private handleError(error: any): Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}