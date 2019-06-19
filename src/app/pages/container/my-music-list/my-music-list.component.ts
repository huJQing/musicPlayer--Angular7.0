import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MusicEmitService} from '../../../services/musicEmit/music-emit.service';
import {MusicService} from '../../../services/music/music.service';
import {UserService} from '../../../services/user/user.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-my-music-list',
  templateUrl: './my-music-list.component.html',
  styleUrls: ['./my-music-list.component.css']
})
export class MyMusicListComponent implements OnInit, OnDestroy {
  navigationSubscription;
  isLogin = false; /*是否登录*/
  userid = ''; /*用户id*/
  musicList = []; /*歌曲列表*/
  showNoMusicTips = false; /*显示没有收藏歌曲的提示*/
  total = 0; /*表格总数据*/
  pageIndex = 1; /*分页器当前选中页码*/
  firstPaginationIndex = 1; /*分页器第一页页码*/
  paginationItemList = []; /*分页器所有页码*/
  /*点击分页器的页数*/
  clickPageItem(e) {
    if ( e === 'l' ) {
      this.pageIndex = this.pageIndex - 4;
    } else if ( e === 'r' ) {
      this.pageIndex = this.pageIndex + 4;
    } else {
      this.pageIndex = e;
    }
    this.buildPagination();
    this.getCollectingMusic();
  }
  /*点击分页器的上一页*/
  previousPage() {
    if (this.pageIndex !== 1 ) {
      this.pageIndex = this.pageIndex - 1;
      this.buildPagination();
      this.getCollectingMusic();
    }
  }
  /*点击分页器的下一页*/
  nextPage() {
    if (this.pageIndex !== Math.ceil(this.total / 10) ) {
      this.pageIndex = this.pageIndex + 1;
      this.buildPagination();
      this.getCollectingMusic();
    }
  }
  /*构建分页器*/
  buildPagination() {
    const paginationItemList = [];
    const pageAllIndex =  Math.ceil(this.total / 10);
    if (pageAllIndex < 9) {
      for (let i = 2; i <= pageAllIndex ; i++) {
        paginationItemList.push(i);
      }
    } else {
      const current = this.pageIndex;
      const left = 5;
      const right = pageAllIndex - 5;
      if (current < 5) {
        for (let i = 2; i <= left; i++) {
          paginationItemList.push(i);
        }
        paginationItemList.push('r');
        paginationItemList.push(pageAllIndex);
      } else if (current >= left - 1 && current <= right + 1) {
        paginationItemList.push('l');
        for (let i = current - 2; i <= current + 2; i++) {
          paginationItemList.push(i);
        }
        paginationItemList.push('r');
        paginationItemList.push(pageAllIndex);
      } else {
        paginationItemList.push('l');
        for (let i = right; i <= pageAllIndex; i++) {
          paginationItemList.push(i);
        }
      }
    }
    this.paginationItemList = paginationItemList;
  }
  /*将歌曲添加到播放列表*/
  changeMusicList(i) {
    const data = {
      type: 'musicList',
      index: i,
      musicList: this.musicList,
    };
    this.musicEmitService.eventEmit.emit(data);
  }
  /*获取我的收藏*/
  getCollectingMusic() {
    this.musicService.getCollectingMusic(this.userid, this.pageIndex).subscribe(
      (data: any) => {
        if ( data.status !== 'error') {
          this.musicList = data;
          if (data[0] !== undefined) {
            this.total = data[0].songCount;
            this.buildPagination();
          } else {
            this.showNoMusicTips = true;
          }
        }
      }
    );
  }
  /*移除我的收藏列表里的歌曲*/
  removeMusic(songid) {
    this.musicService.removeMusic(this.userid, songid).subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.getCollectingMusic();
        }
      }
      );
  }
  /*下载音乐*/
  downloadMusic(songId, source) {
    this.musicService.searchUrl(songId, source).subscribe(
      (data: any) => {
        if (data !== 'error' && data !== null) {
          window.open(data.musicUrl);
        }
      }
    );
  }
  constructor(
    private musicEmitService: MusicEmitService,
    private userService: UserService,
    private musicService: MusicService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => { /*监听路由改变事件*/
      if (event instanceof NavigationEnd) {
        this.initLoad(event);
      }
    });
  }

  initLoad(event: NavigationEnd) { /*当路由改变时，重新判断登录状态*/
    const  userInfo: any = this.userService.isLogin();
    if ( userInfo.isLogin ) {
      this.userid = userInfo.userid;
      this.isLogin = true;
      this.getCollectingMusic();
    } else {
      this.isLogin = false;
    }
  }
  ngOnInit() {
    this.buildPagination();
    const  userInfo: any = this.userService.isLogin();
    if ( userInfo.isLogin ) {
      this.userid = userInfo.userid;
      this.isLogin = true;
      this.getCollectingMusic();
    }
  }
  /*组件销毁生命周期钩子*/
  ngOnDestroy(): void {
    // 销毁navigationSubscription，避免内存泄漏
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
