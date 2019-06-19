import {Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  navList = [
    {
      name: '我的歌单',
      active: true,
      url: 'myMusicList',
      show: true
    },
    {
      name: '精选歌单',
      active: false,
      url: 'recommendedMusicList',
      show: true
    },
    {
      name: '快速搜索',
      active: false,
      url: 'searchMusic',
      show: true
    },
    {
      name: '设置',
      active: false,
      url: 'setting',
      show: false
    },
  ];
  isLogin = false; /*是否登录*/
  nickname = ''; /*用户昵称*/
  navigationSubscription;
  changeActive(i) {
    this.navList.forEach( data => data.active = false);
    this.navList[i].active = true;
  }
  loginOut() {
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('nickname');
    this.isLogin = false;
    this.nickname = '';
    this.router.navigateByUrl('');
  }
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {  /*监听路由改变事件*/
        this.initLoad(event);
      }
    });
  }

  ngOnInit() {
  }

  initLoad(event: NavigationEnd) { /*当路由改变时，重新判断登录状态，同时根据url实时变化navList中active的元素*/
    for ( const i in this.navList) {
<<<<<<< HEAD
      if ( event.url === '/' && i === '0') {
        this.navList[0].active = true;
      } else if ('/' + this.navList[i].url === event.url) {
        this.navList[i].active = true;
      } else if ( event.url.indexOf('/musicList') !== -1) {
        this.navList[1].active = true;
=======
      if ( event.url === '/' ) {
        this.navList[0].active = true;
      } else if ('/' + this.navList[i].url === event.url) {
        this.navList[i].active = true;
>>>>>>> 01b6c0b5a183bc6cec7ccf339c469d6ef1d906ba
      } else {
        this.navList[i].active = false;
      }
    }

    const  userInfo: any = this.userService.isLogin(); /*验证登录状态*/
    if ( userInfo.isLogin ) {
      this.nickname = userInfo.nickname;
      this.isLogin = true;
      this.navList[3].show = true;
    } else {
      this.navList[3].show = false;
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
