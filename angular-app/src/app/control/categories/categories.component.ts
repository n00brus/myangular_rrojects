import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, OperationTypeCode } from '../models/category.model';
import { CategoriesService } from '../services/categories/categories.service';

// import { CategoriesService } from '../services/categories/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() allCategories: Category[];
  @Input() selectedType: OperationTypeCode = 'profit';
  @Input() selectedCategory: Category;
  @Output() changeSelectedCategory = new EventEmitter();
  @Output() newCategory = new EventEmitter();
  @Output() deletedCategory = new EventEmitter();
  newCategoryName: string;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnChanges(): void {
    this.filterCategories();
  }

  ngOnInit(): void {}

  filterCategories() {
    this.categories = this.allCategories.filter(
      (c) => c.type === this.selectedType
    );
  }
  selectCategory(name, ev): void {
    this.changeSelectedCategory.emit(name);
  }
  getcolor() {
    if (this.selectedType == 'consumption') {
      return 'lightcoral';
    }
    if (this.selectedType == 'profit') {
      return '#01D9F2';
    }
  }
  addCategory(): void {
    this.newCategory.emit({
      name: this.newCategoryName,
    });

    // this.operationService.addOperation(this.newOperation);
  }
  deleteCategory(idDeletedCategory) {
    this.deletedCategory.emit(idDeletedCategory);
  }
}
