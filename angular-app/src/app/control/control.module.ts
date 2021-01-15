import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPageComponent } from './control-page/control-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { TypeSwitcherComponent } from './type-switcher/type-switcher.component';
import { OperationEditorComponent } from './operation-editor/operation-editor.component';
import { AllOperationsComponent } from './all-operations/all-operations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from './services/categories/categories.service';
import { OperationService } from './services/operation/operation.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ControlPageComponent,
    CategoriesComponent,
    TypeSwitcherComponent,
    OperationEditorComponent,
    AllOperationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [ControlPageComponent],
  providers: [CategoriesService, OperationService, HttpClientModule],
})
export class ControlModule {}
