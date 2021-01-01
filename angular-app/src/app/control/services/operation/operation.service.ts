import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { allOperations } from '../../data/operations.data';
import { Category } from '../../models/category.model';
import { Operation } from '../../models/operations.model';
@Injectable({
  providedIn: 'root',
})
export class OperationService {
  operations: Operation[] = allOperations;
  constructor() {}
  getOperations(): Observable<Operation[]> {
    return of(this.operations);
  }
  addOperation(name): Promise<Operation> {
    return new Promise((resolve) => {
      const newOperation: Operation = {
        idOperation: this.newOperationId,
        idCategory: name.categoryid,
        value: name.value,
        description: name.description,
      };
      this.operations = [...this.operations, newOperation];
      resolve(newOperation);
    });
  }
  deleteOperation(operationid): Promise<number> {
    return new Promise((resolve) => {
      this.operations = this.operations.filter(
        (n) => n.idOperation != operationid
      );
      resolve(operationid);
    });
  }
  get newOperationId(): number {
    return this.operations.length
      ? this.operations[this.operations.length - 1].idOperation + 1
      : 1;
  }
}
