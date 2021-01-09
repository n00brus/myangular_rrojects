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
        this.selectedCategory.id = category.id;
        name.categoryid = this.selectedCategory.id;

        this.operationsService
          .addOperation(
            name,
            this.allOperations[this.allOperations.length - 1].id + 1
          )
          .then((newOperation) => {
            this.allOperations = [...this.allOperations, newOperation];
          });
        return;
      }
    });
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
      .then((newCategory) => {
        this.categories = [...this.categories, newCategory];
      });
    console.log(this.categories);
  }
  deletedOperation(name) {
    this.operationsService.deleteOperation(name).then((deletedOperation) => {
      this.allOperations = this.allOperations.filter(
        (n) => n.id != deletedOperation
      );
    });
  }
  selectOperation(operation) {
    console.log(operation);
    this.categories.find((e) => {
      if (e.id == operation.idCategory) {
        return (this.selectedCategory = e);
      }
    });
    this.selectedOperation = operation;
  }
  deleteCategory(idDeletedCategory) {
    console.log(name);
    this.categoriesService
      .deleteCategory(idDeletedCategory)
      .then((deletedCategory) => {
        this.categories = this.categories.filter(
          (n) => n.id != deletedCategory
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
