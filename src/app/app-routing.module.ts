import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { UserListComponent } from './user-list/user-list.component'
import { SignupPageComponent } from './signup-page/signup-page.component'
import { ImagePageComponent } from './image-page/image-page.component';

const routes: Routes = [
  { path: 'users/:id/:userImg', component: ImagePageComponent },
  { path: 'users/signup', component: SignupPageComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'users', component: UserListComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
