import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OperationTypeCode } from '../models/category.model';
import { Operation } from '../models/operations.model';
import { CategoriesService } from '../services/categories/categories.service';
import { OperationService } from '../services/operation/operation.service';
import { Category } from '../models/category.model';
import { allCategories } from '../data/categories.data';
@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.scss'],
})
export class ControlPageComponent implements OnInit {
  selectedTypeCode: OperationTypeCode = 'profit';
  selectedCategory = 'Зарплата';
  categories: Category[] = [];
  allOperations: Operation[] = [];
  selectedcategoryid: number;
  newCategory: Category;
  selectedOperation: Operation;
  constructor(
    private categoriesService: CategoriesService,
    private operationsService: OperationService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    forkJoin({
      categories: this.categoriesService.getCategories(),
      allOperations: this.operationsService.getOperations(),
    }).subscribe(({ categories, allOperations }) => {
      this.categories = categories;
      this.allOperations = allOperations;
    });
  }

  changeSeletcedType(type: OperationTypeCode) {
    this.selectedTypeCode = type;
    if (type == 'consumption') {
      this.selectedCategory = 'Бензин';
    }
    if (type == 'profit') {
      this.selectedCategory = 'Зарплата';
    }
    // this.categories = [...this.categories];
  }
  changeSelectedCategory(name: string) {
    this.selectedCategory = name;
  }
  addedNewOperation(name) {
    this.categories.forEach((category) => {
      if (category.name == name.category) {
        this.selectedcategoryid = category.idCategory;
      }
    });
    name.categoryid = this.selectedcategoryid;

    this.operationsService.addOperation(name).then((newOperation) => {
      this.allOperations = [...this.allOperations, newOperation];
    });
  }
  addnewCategory(name) {
    console.log(name.name);
    for (let i = 0; i < this.categories.length; i++) {
      if (name.name == this.categories[i].name) {
        console.log('fdfd');
        return;
      }
    }

    name.type = this.selectedTypeCode;
    this.categoriesService.addCategory(name).then((newCategory) => {
      this.categories = [...this.categories, newCategory];
    });
    console.log(this.categories);
  }
  deletedOperation(name) {
    this.operationsService.deleteOperation(name).then((deletedOperation) => {
      this.allOperations = this.allOperations.filter(
        (n) => n.idOperation != deletedOperation
      );
    });
  }
  selectOperation(operation) {
    console.log(operation);
    allCategories.find;
    this.changeSelectedCategory(operation.idCategory);
    this.selectedOperation = operation;
  }
}
