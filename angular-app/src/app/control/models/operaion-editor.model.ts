  import { Injectable } from '@angular/core';
import { OperationTypeCode } from './category.model';
export interface Operation {
  type: OperationTypeCode;
  category: string;
  value: number;
  description: string;
}

const allOperations: Operation[] = [
  {
    type: 'profit',
    category: 'Зарплата',
    value: 2000,
    description: 'Получил ЗП',
  },
  {
    type: 'consumption',
    category: 'Еда',
    value: 350,
    description: 'Покушал',
  },
  {
    type: 'consumption',
    category: 'Интернет',
    value: 100,
    description: 'Заплатил за интернет',
  },
];
@Injectable()
export class OperationService {
  public operations = allOperations;
  addOperation(operation: Operation): void {
    this.operations = [...this.operations, operation];
  }
}
