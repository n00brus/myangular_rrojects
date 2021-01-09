import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { allCategories } from '../../data/categories.data';
import { Category } from '../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ControlPageComponent } from '../../control-page/control-page.component';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    console.log('2323');
    this.http
      .get<Category[]>('http://localhost:3000/categories')
      .subscribe((res) => {
        console.log(res);
      });
    return this.http.get<Category[]>('http://localhost:3000/categories');
    console.log();
  }
  addCategory(newcategory, categoryid = 1): Promise<Category> {
    const newCategory: Category = {
      id: categoryid,
      type: newcategory.type,
      name: newcategory.name,
    };
    this.http.post(
      'https://my-json-server.typicode.com/n00brus/myjsonfiles/categories',
      newCategory
    );
    // return this.http.post<Category>(
    //   'https://my-json-server.typicode.com/n00brus/myjsonfiles/categories',
    //   newCategory
    // );
    return new Promise((resolve) => {
      resolve(newCategory);
    });
  }
  deleteCategory(categoryid: number): Promise<any> {
    console.log(231);
    console.log(categoryid);
    categoryid = 4;
    console.log(categoryid);

    this.http
      .delete('http://localhost:3000/categories/' + categoryid)
      .subscribe((res) => {
        console.log(res);
      });
    return new Promise((resolve) => {
      resolve(categoryid);
    });
    // return this.http.delete<number>(
    //   'https://my-json-server.typicode.com/n00brus/myjsonfiles/categories',
    //   categoryid
    // );
  }
  // get newCategoryId(): number {
  //   return this.categories.length
  //     ? this.categories[this.categories.length - 1].idCategory + 1
  //     : 1;
  // }
}
