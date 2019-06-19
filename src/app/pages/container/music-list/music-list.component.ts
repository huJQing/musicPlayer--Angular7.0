import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicService} from '../../../services/music/music.service';
import {MusicEmitService} from '../../../services/musicEmit/music-emit.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  isLogin = false; /*是否登录*/
  userid = ''; /*用户id*/
  listId = '';
  musicList = []; /*歌曲列表*/
  discInfo = {
    dissPic: '',
    dissName: '',
    creatorNickname: '',
    createTime : '',
    listenNum : ''
  };
  /*获取推荐歌单信息及其歌曲*/
  getRecommendedListSongs() {
    this.musicService.getRecommendedListSongs(this.listId).subscribe(
      (data: any) => {
        if (data.status !== 'error' && data[0] !== undefined) {
          this.musicList = data;
          this.discInfo.dissPic = data[0].dissPic;
          this.discInfo.dissName = data[0].dissName;
          this.discInfo.creatorNickname = data[0].creatorNickname;
          this.discInfo.createTime = data[0].createTime;
          this.discInfo.listenNum = data[0].listenNum;

        }
      }
    );
  }
  changeMusicList(i) {
    const data = {
      type: 'single',
      index: 0,
      musicList: this.musicList[i],
    };
    this.musicEmitService.eventEmit.emit(data);
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
  /*下载音乐*/
  downloadMusic(songId, source) {
    this.musicService.searchUrl(songId, source).subscribe(
      (data: any) => {
        if (data !== 'error' && data !== null) {
          window.open(data.musicUrl);
        } else {
        }
      }
    );
  }
  constructor(
    private musicEmitService: MusicEmitService,
    private activatedRoute: ActivatedRoute,
    private musicService: MusicService,
    private userService: UserService
  ) {
    this.listId = this.activatedRoute.snapshot.paramMap.get('listId');
    if (this.listId !== '') {
      this.getRecommendedListSongs();
    }
  }

  ngOnInit() {
    const  userInfo: any = this.userService.isLogin();
    if ( userInfo.isLogin ) {
      this.userid = userInfo.userid;
      this.isLogin = true;
    }
  }

}
