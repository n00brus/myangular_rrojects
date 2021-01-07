import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OperationTypeCode } from '../models/category.model';
import { Operation } from '../models/operations.model';
import { OperationService } from '../services/operation/operation.service';

@Component({
  selector: 'app-operation-editor',
  templateUrl: './operation-editor.component.html',
  styleUrls: ['./operation-editor.component.css'],
})
export class OperationEditorComponent implements OnInit {
  @Input() selectedCategory: string;
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
      type: this.selectedType,
      category: this.selectedCategory,
      categoryid: Number,
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
