import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { allOperations } from '../../data/operations.data';
import { Category } from '../../models/category.model';
import { Operation } from '../../models/operations.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  // operations: Operation[] = allOperations;
  constructor(private http: HttpClient) {}
  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(
      'https://my-json-server.typicode.com/n00brus/myjsonfiles/operations'
    );
  }
  addOperation(name, newOperationId): Promise<Operation> {
    const newOperation: Operation = {
      // idOperation: this.newOperationId,
      id: newOperationId,

      idCategory: name.categoryid,
      value: name.value,
      description: name.description,
    };
    return new Promise((resolve) => {
      // this.operations = [...this.operations, newOperation];
      resolve(newOperation);
    });
    // return this.http.post<Operation>(
    //   'https://my-json-server.typicode.com/n00brus/myjsonfiles/operations',
    //   newCategory
    // );
  }
  deleteOperation(operationid): Promise<number> {
    this.http.delete(
      'https://my-json-server.typicode.com/n00brus/myjsonfiles/db/operations/1'
    );
    console.log('lol');

    return new Promise((resolve) => {
      // this.operations = this.operations.filter(
      //   (n) => n.idOperation != operationid
      // );
      resolve(operationid);
    });

    // return this.http.delete<number>(
    //   'https://my-json-server.typicode.com/n00brus/myjsonfiles/operations',
    //   operationid
    // );
  }
  // get newOperationId(): number {
  //   return this.operations.length
  //     ? this.operations[this.operations.length - 1].idOperation + 1
  //     : 1;
  // }
}
