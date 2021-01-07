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
  selectedTypeCode: OperationTypeCode;
  selectedCategory: Category;
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
      this.changeSeletcedType('profit');
      console.log(32);
    });
  }

  changeSeletcedType(type: OperationTypeCode) {
    this.selectedTypeCode = type;
    this.categories.find((e) => {
      if (e.type == this.selectedTypeCode) {
        return (this.selectedCategory = e);
      }
    });
    console.log(this.categories);
    // this.categories = [...this.categories];
  }
  changeSelectedCategory(name: Category) {
    this.selectedCategory = name;
  }
  addedNewOperation(name) {
    // this.categories.forEach((category) => {
    //   if (category.name == name.category) {
    //     this.selectedcategoryid = category.idCategory;
    //   }
    // });
    // name.categoryid = this.selectedcategoryid;

    // this.operationsService.addOperation(name).then((newOperation) => {
    //   this.allOperations = [...this.allOperations, newOperation];
    // });
    console.log(name);

    this.categories.forEach((category) => {
      if (category.name == name.category) {
        this.selectedcategoryid = category.idCategory;
        name.categoryid = this.selectedcategoryid;

        this.operationsService.addOperation(name).then((newOperation) => {
          this.allOperations = [...this.allOperations, newOperation];
        });
        return;
      }
    });
  }
  addnewCategory(name) {
    console.log(name.name);
    for (let i = 0; i < this.categories.length; i++) {
      if (name.name == this.categories[i].name) {
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
    this.categories.find((e) => {
      if (e.idCategory == operation.idCategory) {
        return (this.selectedCategory = e);
      }
    });
    this.selectedOperation = operation;
  }
  deleteCategory(name) {
    console.log(name);
    this.categoriesService.deleteCategory(name).then((deletedCategory) => {
      this.categories = this.categories.filter(
        (n) => n.idCategory != deletedCategory
      );
      this.allOperations = this.allOperations.filter((operation) => {
        if (operation.idCategory != name) {
          return operation;
        }
      });
      this.selectCategory(name);
    });
  }
  selectCategory(idDeletedCategory: number = 0) {
    if ((this.selectedcategoryid = idDeletedCategory)) {
      this.categories.find((e) => {
        if (e.type == this.selectedTypeCode) {
          return (this.selectedCategory = e);
        }
      });
    }
  }
}
