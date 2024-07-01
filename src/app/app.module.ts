import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {IconxComponent} from "../../projects/ng-iconsax/src/iconx/iconx.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IconxComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
