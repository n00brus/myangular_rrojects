import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { allCategories } from '../../data/categories.data';
import { Category } from '../../models/category.model';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: Category[] = allCategories;
  constructor() {}
  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }
  addCategory(name): Promise<Category> {
    return new Promise((resolve) => {
      const newCategory: Category = {
        idCategory: this.newCategoryId,
        type: name.type,
        name: name.name,
        selected: false,
      };
      this.categories = [...this.categories, newCategory];

      resolve(newCategory);
    });
  }
  get newCategoryId(): number {
    return this.categories.length
      ? this.categories[this.categories.length - 1].idCategory + 1
      : 1;
  }
}
