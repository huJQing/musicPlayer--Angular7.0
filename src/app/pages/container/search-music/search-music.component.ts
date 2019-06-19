import { Component, OnInit } from '@angular/core';
import {MusicEmitService} from '../../../services/musicEmit/music-emit.service';
import {MusicService} from '../../../services/music/music.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {
  isLogin = false; /*是否登录*/
  userid = ''; /*用户id*/
  searchFrom = '网易云'; /*搜索的资源是网易还是qq*/
  musicList = []; /*歌曲列表*/
  total = 0; /*表格总数据*/
  pageIndex = 1; /*分页器当前选中页码*/
  firstPaginationIndex = 1; /*分页器第一页页码*/
  paginationItemList = []; /*分页器所有页码*/
  searchValue = '华语流行';
  changeSearchFrom(e) {
    this.searchFrom = e;
  }
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
    this.musicSearch();
  }
  /*点击分页器的上一页*/
  previousPage() {
    if (this.pageIndex !== 1 ) {
      this.pageIndex = this.pageIndex - 1;
      this.buildPagination();
      this.musicSearch();
    }
  }
  /*点击分页器的下一页*/
  nextPage() {
    if (this.pageIndex !== Math.ceil(this.total / 10) ) {
      this.pageIndex = this.pageIndex + 1;
      this.buildPagination();
      this.musicSearch();
    }
  }
  /*构建分页器*/
  buildPagination() {
    const paginationItemList = [];
    const pageAllIndex = Math.ceil(this.total / 10);
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
  changeMusicList(i) {
    const data = {
      type: 'single',
      index: 0,
      musicList: this.musicList[i],
    };
    this.musicEmitService.eventEmit.emit(data);
  }
  searchButton() {
    this.pageIndex = 1;
    this.musicSearch();
  }
  musicSearch() {
    if (this.searchValue === '' ) { return 0; }
    let sourse = 'netease';
    if ( this.searchFrom !== '网易云') {
      sourse = 'tencent';
    }
    this.musicService.searchMusic(this.searchValue, this.pageIndex , sourse).subscribe(
      (data: any) => {
        if (data.status !== 'error') {
          this.musicList = data;
          this.total = data[0].songCount;
          this.buildPagination();
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
  /*收藏音乐*/
  collectingMusic(item) {
    if (this.isLogin) {
      this.musicService.collectingMusic(this.userid, item.songId, item.songName, item.singerId, item.singerName,
        item.albumId, item.albumName, item.albumPic, item.songTime, item.copyright , item.source).subscribe(
        (data: any) => {
      });
    }
  }
  constructor(
    private musicEmitService: MusicEmitService,
    private musicService: MusicService,
    private userService: UserService
  ) {
    this.buildPagination();
  }
  ngOnInit() {
    this.musicSearch();
    const  userInfo: any = this.userService.isLogin();
    if ( userInfo.isLogin ) {
      this.userid = userInfo.userid;
      this.isLogin = true;
    }
  }

}
