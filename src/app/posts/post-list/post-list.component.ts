import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First post', content: 'Forst Post content'},
  //   {title: 'Secont post', content: 'Second Post content'},
  //   {title: 'Third post', content: 'Third Post content'}
  // ];

  totalPosts = 0;
  postsPerPage = 10000;
  pageSizeOptions = [1, 2, 5, 10, 100];
  currentPage = 1;
  posts: Post[] = [];
  private postsSub: Subscription;

  postsService: PostsService;
  constructor(postsService: PostsService) {
    this.postsService = postsService;
  }

  // togg() {
  //   const x = document.getElementById('butt');
  //   if (x.style.display === 'none') {
  //     x.style.display = 'block';
  //   } else {
  //     x.style.display = 'none';
  //   }
  // }


  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
