import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authenticate/login/login.component';
import { OurTestimonyComponent } from './testimony/our-testimony/our-testimony.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoggedIn, LoggedOut } from './authenticate/auth.guard';
import { MyTestimonyComponent } from './testimony/my-testimony/my-testimony.component';
import { OurTestimonyResolverService } from './testimony/our-testimony/our-testimony-resolver.service';
import { MyTestimonyResolverService } from './testimony/my-testimony/my-testimony-resolver.service';
import { NewTestimonyComponent } from './testimony/new-testimony/new-testimony.component';
import { TestimonyEditModalComponent } from './testimony-edit-modal/testimony-edit-modal.component';
import { TestimonyDeleteModalComponent } from './testimony-delete-modal/testimony-delete-modal.component';
import { TestimonyViewModalComponent } from './testimony-view-modal/testimony-view-modal.component';
import { TestimonyViewRedirect } from './testimony-view-modal/testimony-view.guard';

const routes: Routes = [
  { path: '', redirectTo: '/our-testimony', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthenticateComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
    canActivate: [LoggedOut],
  },

  {
    path: 'our-testimony',
    component: OurTestimonyComponent,
    resolve: [OurTestimonyResolverService],
    children: [
      {
        path: 'edit/:id',
        component: TestimonyEditModalComponent,
        canActivate: [LoggedIn],
      },
      {
        path: 'delete/:id',
        component: TestimonyDeleteModalComponent,
        canActivate: [LoggedIn],
      },
      {
        path: 'view/:id',
        component: TestimonyViewModalComponent,
      },
    ],
  },
  {
    path: 'my-testimony',
    component: MyTestimonyComponent,
     resolve: [MyTestimonyResolverService],
    canActivate: [LoggedIn],
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   component: MyTestimonyComponent,
      //   resolve: [MyTestimonyResolverService],
      //   canActivate: [LoggedIn],
      // },
      {
        path: 'new-testimony',
        component: NewTestimonyComponent,
        canActivate: [LoggedIn],
        outlet:"new"
      },
      {
        path: 'edit/:id',
        component: TestimonyEditModalComponent,
        canActivate: [LoggedIn],
      },
      {
        path: 'delete/:id',
        component: TestimonyDeleteModalComponent,
        canActivate: [LoggedIn],
      },
      {
        path: 'view/:id',
        component: TestimonyViewModalComponent,
        //canActivate: [TestimonyViewRedirect],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
