import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category, OperationTypeCode } from '../models/category.model';
import { Operation } from '../models/operations.model';
import { OperationService } from '../services/operation/operation.service';
@Component({
  selector: 'app-all-operations',
  templateUrl: './all-operations.component.html',
  styleUrls: ['./all-operations.component.css'],
})
export class AllOperationsComponent implements OnInit {
  @Input() selectedType: OperationTypeCode;
  @Input() allOperations: Operation[];
  @Input() allCategories: Category[];
  @Output() deleteOperation = new EventEmitter();
  @Output() selectedOperation = new EventEmitter();
  operations: Operation[] = [];
  categories: Category[] = [];
  categoryid: number = -1; //если -1 то выводит все операции, другие числа буду выводить операции у которых айди== айди категории
  constructor(private operationService: OperationService) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.filtercategories();
    this.filteroperations();
    this.categorylist();
  }
  filtercategories() {
    this.categories = this.allCategories.filter(
      (o) => o.type === this.selectedType
    );
  }
  filteroperations() {
    this.operations = [];
    this.categories.forEach((category) => {
      this.allOperations.forEach((operation) => {
        if (category.idCategory == operation.idCategory) {
          this.operations = [...this.operations, operation];
        }
      });
    });
  }
  categorylist() {
    this.filteroperations();
    if (+this.categoryid == -1) {
      return;
    }
    this.operations = [];
    this.allOperations.forEach((operation) => {
      if (this.categoryid == operation.idCategory) {
        this.operations = [...this.operations, operation];
      }
    });
  }
  deleteOperations(ev) {
    this.deleteOperation.emit(ev.target.dataCategoryid);
  }
  selectOperation(ev, operation) {
    this.selectedOperation.emit(operation);
  }
}
