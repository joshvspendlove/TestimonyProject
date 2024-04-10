import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './dropdown.directive';
import { LoginComponent } from './authenticate/login/login.component';
import { OurTestimonyComponent } from './testimony/our-testimony/our-testimony.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyTestimonyComponent } from './testimony/my-testimony/my-testimony.component';
import { TestimonyItemComponent } from './testimony/testimony-item/testimony-item.component';
import { TestimonyListComponent } from './testimony/testimony-list/testimony-list.component';
import { NewTestimonyComponent } from './testimony/new-testimony/new-testimony.component';
import { TestimonyEditModalComponent } from './testimony-edit-modal/testimony-edit-modal.component';
import { TestimonyDeleteModalComponent } from './testimony-delete-modal/testimony-delete-modal.component';
import { TestimonyViewModalComponent } from './testimony-view-modal/testimony-view-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    LoginComponent,
    OurTestimonyComponent,
    SignupComponent,
    AuthenticateComponent,
    MyTestimonyComponent,
    TestimonyItemComponent,
    TestimonyListComponent,
    NewTestimonyComponent,
    TestimonyEditModalComponent,
    TestimonyDeleteModalComponent,
    TestimonyViewModalComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
