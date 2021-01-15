import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OperationTypeCode } from '../models/category.model';
import { Operation } from '../models/operations.model';
import { CategoriesService } from '../services/categories/categories.service';
import { OperationService } from '../services/operation/operation.service';
import { Category } from '../models/category.model';
@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.scss'],
})
export class ControlPageComponent implements OnInit {
  selectedTypeCode: OperationTypeCode;
  selectedCategory: Category;
  categories: Category[] = [];
  allOperations: Operation[] = [];
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

      this.changeSeletcedType('profit');
    });
  }

  changeSeletcedType(type: OperationTypeCode) {
    this.selectedTypeCode = type;
    this.categories.find((e) => {
      if (e.type == this.selectedTypeCode) {
        return (this.selectedCategory = e);
      }
    });
  }
  changeSelectedCategory(name: Category) {
    this.selectedCategory = name;
  }
  addedNewOperation(operation) {
    // this.selectedCategory.id = category.id;
    this.operationsService
      .addOperation(
        operation,
        this.allOperations[this.allOperations.length - 1].id + 1
      )
      .subscribe((newOperation) => {
        this.allOperations = [...this.allOperations, newOperation];
      });
    return;
  }
  addnewCategory(newcategory) {
    for (let i = 0; i < this.categories.length; i++) {
      if (newcategory.name == this.categories[i].name) {
        return;
      }
    }
    newcategory.type = this.selectedTypeCode;
    this.categoriesService
      .addCategory(
        newcategory,
        this.categories[this.categories.length - 1].id + 1
      )
      .subscribe((newCategory) => {
        this.categories = [...this.categories, newCategory];
      });
    console.log(this.categories);
  }
  deletedOperation(idoperation: number) {
    this.operationsService
      .deleteOperation(idoperation)
      .subscribe((deletedOperation) => {
        this.allOperations = this.allOperations.filter(
          (n) => n.id != idoperation
        );
      });
  }
  mergeOperation(operation) {
    this.operationsService.mergeOperation(operation).subscribe((smth) => {
      this.allOperations.find((operation) => {
        if ((smth = operation)) {
          return smth;
        }
      });
    });
  }
  deleteCategory(idDeletedCategory: number) {
    this.categoriesService
      .deleteCategory(idDeletedCategory)
      .subscribe((deletedCategory) => {
        this.categories = this.categories.filter(
          (n) => n.id != idDeletedCategory
        );
        this.allOperations = this.allOperations.filter((operation) => {
          if (operation.idCategory != idDeletedCategory) {
            return operation;
          }
        });
        this.selectCategory(idDeletedCategory);
      });
  }
  selectCategory(idDeletedCategory: number = 0) {
    if ((this.selectedCategory.id = idDeletedCategory)) {
      this.categories.find((e) => {
        if (e.type == this.selectedTypeCode) {
          return (this.selectedCategory = e);
        }
      });
    }
  }
}
