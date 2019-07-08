import { Post } from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number}>('https://sheltered-plateau-64226.herokuapp.com/api/posts' + queryParams)
    .pipe(map((postData) => {
      return { posts: postData.posts.map(post => {
        return{
          title: post.title,
          content: post.content,
          id: post._id
        };
      }), maxPosts: postData.maxPosts};
    }))
    .subscribe((TranspostData) => {
      this.posts = TranspostData.posts;
      this.postsUpdated.next({posts: [...this.posts], postCount: TranspostData.maxPosts});
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return {...this.posts.find(p => p.id === id)};
  }

  addPost(titlee: string, contente: string) {
    const post: Post = {id: null, title: titlee, content: contente};
    this.http.post<{message: string, postId: string}>('https://sheltered-plateau-64226.herokuapp.com/api/posts', post).pipe().subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updatePost(idd: string, titlee: string, contentt: string){
    const post: Post = { id: idd, title: titlee, content: contentt };
    this.http.put('https://sheltered-plateau-64226.herokuapp.com/api/posts/' + idd, post)
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string){
    return this.http.delete('https://sheltered-plateau-64226.herokuapp.com/api/posts/' + postId);
  }

}
