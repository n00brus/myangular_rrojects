import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Operation } from '../../models/operations.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private http: HttpClient) {}
  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>('http://localhost:3000/operations');
  }
  addOperation(operation, newOperationId): Observable<Operation> {
    const newOperation: Operation = {
      id: newOperationId,

      idCategory: operation.categoryid,
      value: operation.value,
      description: operation.description,
    };
    return this.http.post<Operation>(
      'http://localhost:3000/operations',
      newOperation
    );
  }
  deleteOperation(operationid): Observable<number> {
    return this.http.delete<number>(
      'http://localhost:3000/operations/' + operationid
    );
  }
}
