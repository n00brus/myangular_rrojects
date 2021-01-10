import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Category, OperationTypeCode } from '../models/category.model';
import { Operation } from '../models/operations.model';
import { OperationService } from '../services/operation/operation.service';

@Component({
  selector: 'app-operation-editor',
  templateUrl: './operation-editor.component.html',
  styleUrls: ['./operation-editor.component.css'],
})
export class OperationEditorComponent implements OnInit {
  @Input() selectedCategory: Category = { id: 1, type: 'profit', name: 'ds' };
  @Input() selectedType: OperationTypeCode;
  @Input() set selectedOperation(operation: Operation) {
    this.Operation = operation;
    this.mergeOperation();
  }
  @Output() newOperation = new EventEmitter();
  Operation: Operation;
  money: number;
  description: string;
  newoperationobject;
  good: string;
  constructor(private operationService: OperationService) {}
  ngOnChanges(): void {}
  ngOnInit(): void {}
  addOperation(): void {
    this.newoperationobject = {
      categoryid: this.selectedCategory.id,
      value: this.money,
      description: this.description,
    };
    this.money = 0;
    this.description = '';

    this.newOperation.emit(this.newoperationobject);

    // this.operationService.addOperation(this.newOperation);
  }
  mergeOperation() {
    if (this.Operation) {
      this.money = this.Operation.value;
      this.description = this.Operation.description;
    }
    // console.log(this.Operation);
  }
}
