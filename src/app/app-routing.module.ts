import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '', component: PostListComponent
  },
  {
    path: 'create', component: PostCreateComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'edit/:postId', component: PostCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
