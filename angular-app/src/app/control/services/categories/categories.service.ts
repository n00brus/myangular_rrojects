import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
// import { allCategories } from '../../data/categories.data';
import { Category } from '../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { ControlPageComponent } from '../../control-page/control-page.component';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }
  addCategory(newcategory, categoryid = 1): Observable<Category> {
    const newCategory: Category = {
      id: categoryid,
      type: newcategory.type,
      name: newcategory.name,
    };

    return this.http.post<Category>(
      'http://localhost:3000/categories',
      newCategory
    );
  }
  deleteCategory(categoryid: number): Observable<any> {
    return this.http.delete<number>(
      'http://localhost:3000/categories/' + categoryid
    );
  }
}
