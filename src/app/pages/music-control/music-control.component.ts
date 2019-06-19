import {Component, ElementRef, OnInit} from '@angular/core';
import {MusicEmitService} from '../../services/musicEmit/music-emit.service';
import {MusicService} from '../../services/music/music.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-music-control',
  templateUrl: './music-control.component.html',
  styleUrls: ['./music-control.component.css']
})
export class MusicControlComponent implements OnInit {
  musicList = []; /*歌曲列表*/
  nowPlayMusic = { songId: 0, songTime: 0, albumPic: '', songName: '', singerName: '', }; /*当前播放歌曲的信息*/
  nowPlayMusicUrl: SafeResourceUrl = '';  /*当前播放歌曲的url*/
  isPlaying = false; /*播放器当前是否播放*/
  musicCurrentTime = 0; /*歌曲当前播放到的时间，单位毫秒*/
  musicTimeRangeValue = 0; /*歌曲时间滑动选择器中的值，数据范围0到100*/
  volumeRangeValue = 100; /*音量滑动选择器中的值，数据范围0到100*/
  musicTimeRangeStyle = {'background-size' : '0 100%'}; /*range滑动选择器中白色背景色的长度*/
  volumeRangeStyle = {'background-size' : '100% 100%'}; /*音量滑动选择器中白色背景色的长度*/
  musicTimePromise; /*实时更新播放时间以及range滑动选择器的定时器*/
  showVolumeRange = false; /*是否显示音量控件*/
  showMusicList = false; /*是否显示播放歌曲列表*/
  nowPlayMode = 'repeat-all'; /*当前的播放模式*/
  playModelList = ['repeat-all', 'repeat-random', 'repeat-one'];
  playModeIconUrl = 'http://47.100.197.56/static/image/repeat-all.png';  /*播放模式图标的路径*/
  navigationSubscription;
  /*播放音乐
  * pauseHandel： string， 是否可以暂停音乐。设置此变量是为了在拖动滑动选择器时，可以直接开始播放音乐；在点击见面按钮时，可以暂停也可以播放音乐
  * */
  playMusic( pauseHandel: boolean ) {
    if (this.nowPlayMusicUrl === '') {
      this.nowPlayMusic = this.musicList[0];
      this.getNextMusicUrlAndPlay(0);
    } else {
      if (this.isPlaying && pauseHandel) {
        this.el.nativeElement.querySelector('.musicAudio').pause();
        this.isPlaying = false;
        window.clearInterval( this.musicTimePromise );
      } else {
        this.musicProgress();
        this.el.nativeElement.querySelector('.musicAudio').play();
        this.isPlaying = true;
      }
    }
  }
  /*播放上一首*/
  prevMusic() {
    let index = 0;
    this.musicList.forEach( (item, i) => {
      if ( item.songId === this.nowPlayMusic.songId) {
        index = i;
      }
    });
    if (this.nowPlayMode === 'repeat-all') {
      if (index === 0) {
        index = this.musicList.length - 1;
      } else {
        index = index - 1;
      }
    } else if (this.nowPlayMode === 'repeat-random') {
      index = Math.floor(Math.random() * this.musicList.length);
    }
    this.getNextMusicUrlAndPlay(index);
  }
  /*播放下一首*/
  nextMusic() {
    let index = 0;
    this.musicList.forEach( (item, i) => {
      if ( item.songId === this.nowPlayMusic.songId) {
        index = i;
      }
    });
    if (this.nowPlayMode === 'repeat-all') {
      if (index === this.musicList.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
    } else if (this.nowPlayMode === 'repeat-random') {
      index = Math.floor(Math.random() * this.musicList.length);
    }
    this.getNextMusicUrlAndPlay(index);
  }
  /*拖动range选择器，改变歌曲播放进度*/
  musicRangeChange(e) {
    this.playMusic(false); /*拖动range选择器时，默认直接开始播放音乐*/
    const time = this.nowPlayMusic.songTime / 1000; /*获取当前歌曲总时长*/
    this.el.nativeElement.querySelector('.musicAudio').currentTime = (time * e.target.value / 100); /*根据range选择器中的值和歌曲总时长重置当前歌曲的播放时间*/
    this.musicTimeRangeStyle = {'background-size': (e.target.value) + '% 100%'}; /*根据range选择器中的值设置range选择器的背景长度*/
  }
  /*实时显示歌曲进度
  * time： string，调用此方法时，歌曲所播放到的时间
  * */
  musicProgress() {
    window.clearInterval(this.musicTimePromise ); /*每次调用前，先取消定时器*/
    this.musicCurrentTime = this.el.nativeElement.querySelector('.musicAudio').currentTime * 100; /*将当前播放到的时间保存在musicCurrentTime中，以便实时渲染到html中*/
    const duration = this.nowPlayMusic.songTime / 1000; /*获取歌曲总时长*/
    if ( isNaN(duration) ) { return 0; }
    this.musicTimePromise  = setInterval(() => {
      const percentage = Math.round(this.musicCurrentTime / duration); /*计算当前歌曲所播放到的百分比，并向下取整*/
      this.musicTimeRangeStyle = {'background-size' : percentage + '% 100%'}; /*根据歌曲播放到的百分比，更新range选择器的背景长度*/
      this.musicTimeRangeValue = percentage; /*根据歌曲播放到的百分比，更新range选择器中的值，以来更新range选择器中小圆点的位置*/
      this.musicCurrentTime = this.el.nativeElement.querySelector('.musicAudio').currentTime * 100; /*在定时器中time是每秒递增的，实时更新歌曲当前播放到的时间，以便实时渲染到html中*/
  }, 1000);
  }
  /*点击显示音量调节按钮*/
  showVolumeRangeControl() {
    this.showVolumeRange = !this.showVolumeRange;
  }
  /*点击显示歌曲列表*/
  showMusicListControl() {
    this.showMusicList = !this.showMusicList;
  }
  volumeRangeChange(e) {
    this.el.nativeElement.querySelector('.musicAudio').volume = e.target.value / 100;
    this.volumeRangeStyle = {'background-size' : (e.target.value) + '% 100%'};
    this.volumeRangeValue = e.target.value;
  }
  /*更改播放模式*/
  changePlayMode() {
    let index = this.playModelList.indexOf(this.nowPlayMode);
    if (index === 2) { index = -1; }
    this.nowPlayMode = this.playModelList[index + 1];
    this.playModeIconUrl = 'http://47.100.197.56/static/image/' + this.playModelList[index + 1] + '.png';
  }
  /*获取下一首歌曲播放地址并且播放*/
  getNextMusicUrlAndPlay(index) {
    this.musicService.searchUrl(this.musicList[index].songId, this.musicList[index].source).subscribe(
      (data: any) => {
        if (data.status !== 'error' && data !== null) {
          this.nowPlayMusic = this.musicList[index];
          this.nowPlayMusicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.musicUrl);
          if ( this.musicList[index].source === 'tencent') {
            this.getTencentAlbumImg(this.musicList[index].albumId);
          }
          this.isPlaying = true;
          /*以下是清重置range滑动选择器的背景，
          重置歌曲当前播放到的时间，
          重置range滑动选择器中的值，
          */
          window.clearInterval(this.musicTimePromise );
          this.musicTimeRangeValue = 0;
          this.musicTimeRangeStyle = {'background-size' : '0 100%'};
          this.musicCurrentTime = 0;
        }
      }
    );
  }
  /*获取QQ音乐的专辑封面*/
  getTencentAlbumImg(albumId) {
    this.musicService.getTencentAlbumData(albumId).subscribe(
      (data: any) => {
        this.nowPlayMusic.albumPic = data.albumUrl;
      }
    );
  }
  /*用户没有登录时，默认搜索华语流行，加入播放列表*/
  getDefaultMusic() {
    this.musicService.searchMusic('华语流行', 1, 'netease').subscribe(
      (data: any) => {
        if (data.status !== 'error') {
          this.musicList = data;
          this.nowPlayMusic = data[0];
        }
      });
  }
  /*用户登录时，获取用户的收藏歌曲，加入播放列表*/
  getCollectingMusic(userId) {
    this.musicService.getCollectingMusic( userId , '1').subscribe(
      (data: any) => {
        if ( data.status !== 'error') {
          this.musicList = data;
          if (data[0] !== undefined) {
            this.nowPlayMusic = data[0];
          } else {
            this.getDefaultMusic(); /*如果收藏为空，则获取默认列表*/
          }
        }
      }
    );
  }
  /*播放列表中点击歌曲，改变当前播放歌曲*/
  changNowPlayMusic(index) {
    this.getNextMusicUrlAndPlay(index);
  }
  constructor(
    private el: ElementRef,
    private musicEmitService: MusicEmitService,
    private musicService: MusicService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) { }
  ngOnInit() { // 接收发射过来的数据
    this.musicEmitService.eventEmit.subscribe(
      (data: any) => {
      if (data.type === 'single') {/*插入单曲*/
        let index = 0;
        let haveMusic = false;
        for (let i = 0; i < this.musicList.length - 1; i++) {
          if ( this.musicList[i].songId === this.nowPlayMusic.songId) {
            index = i;
          }
          if ( this.musicList[i].songId === data.musicList.songId ) {/*检查歌曲是否已经存在歌单中了*/
            index = i;
            haveMusic = true;
            break;
          }
        }
        if ( !haveMusic ) {
          this.musicList.splice(index + 1, 0,  data.musicList);
          this.getNextMusicUrlAndPlay(index + 1);
        } else {
          this.getNextMusicUrlAndPlay(index);
        }
      } else if (data.type === 'musicList') {/*插入歌曲列表*/
        this.musicList = data.musicList;
        this.getNextMusicUrlAndPlay(data.index);
      }
    });
    const userInfo: any = this.userService.isLogin();
    if (userInfo.isLogin) {
      this.getCollectingMusic(userInfo.userid);
    } else {
      this.getDefaultMusic();
    }
  }

}
