import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ControlModule } from './control/control.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
