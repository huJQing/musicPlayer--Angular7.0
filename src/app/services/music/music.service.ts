import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  /*搜索音乐*/
  searchMusic(value, page) {
    const data = new HttpParams()
      .append('selectKey', value)
      .append('page', page);
    return(this.http.post('/music/searchData/', data));
  }
  /*获取歌曲播放地址*/
  searchUrl(key) {
    const data = new HttpParams()
      .append('selectKey', key);
    return(this.http.post('/music/searchUrl/', data));
  }
  /*收藏音乐*/
  collectingMusic(userid, songid, songname, singerid, singername, albumid, albumname, albumpic, songtime, copyright) {
    console.log(userid, songid, songname, singerid, singername, albumid, albumname, albumpic, songtime, copyright);
    const data = new HttpParams()
      .append('userid', userid)
      .append('songid', songid)
      .append('songname', songname)
      .append('singerid', singerid)
      .append('singername', singername)
      .append('albumid', albumid)
      .append('albumname', albumname)
      .append('albumpic', albumpic)
      .append('songtime', songtime)
      .append('copyright', copyright);
    return(this.http.post('/music/addfavsong/', data));
  }
  /*获取收藏列表*/
  getCollectingMusic(userid, page) {
    const data = new HttpParams()
      .append('userid', userid)
      .append('page', page);
    return(this.http.post('/music/selectfavsong/', data));
  }
  /*移除我的收藏列表里的歌曲*/
  removeMusic(userid, songid) {
      const data = new HttpParams()
        .append('userid', userid)
        .append('songid', songid);
      return(this.http.post('/music/deletefavsong/', data));
  }
  constructor(
    private http: HttpClient
  ) { }
}
