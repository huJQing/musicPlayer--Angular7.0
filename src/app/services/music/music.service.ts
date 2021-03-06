import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  /*搜索音乐*/
<<<<<<< HEAD
  searchMusic(value, page, source?) {
    const data = new HttpParams()
      .append('selectKey', value)
      .append('source', source)
      .append('page', page);
    return(this.http.post('/searchData/', data));
  }
  /*获取歌曲播放地址*/
  searchUrl(selectKey, source) {
    const data = new HttpParams()
      .append('selectKey', selectKey)
      .append('source', source);
    return(this.http.post('/searchUrl/', data));
  }
  /*收藏音乐*/
  collectingMusic(userId, songId, songName, singerId, singerName, albumId, albumName, albumPic, songTime, copyright, source) {
    const data = new HttpParams()
      .append('userId', userId)
      .append('songId', songId)
      .append('songName', songName)
      .append('singerId', singerId)
      .append('singerName', singerName)
      .append('albumId', albumId)
      .append('albumName', albumName)
      .append('albumPic', albumPic)
      .append('songTime', songTime)
      .append('source', source)
      .append('copyright', copyright);
    return(this.http.post('/addFavoriteSong/', data));
  }
  /*获取收藏列表*/
  getCollectingMusic(userId, page) {
    const data = new HttpParams()
      .append('userId', userId)
      .append('page', page);
    return(this.http.post('/selectFavoriteSong/', data));
  }
  /*移除我的收藏列表里的歌曲*/
  removeMusic(userId, songId) {
      const data = new HttpParams()
        .append('userId', userId)
        .append('songId', songId);
      return(this.http.post('/deleteFavoriteSong/', data));
  }
  /*获取推荐歌单*/
  getRecommendedList() {
    return(this.http.post('/recommendList/', ''));
  }
  /*获取推荐歌单信息及其歌曲*/
  getRecommendedListSongs(selectKey) {
    const data = new HttpParams()
      .append('selectKey', selectKey);
    return(this.http.post('/recommendListSongs/', data));
  }
  /*获取QQ音乐的专辑封面*/
  getTencentAlbumData(selectKey) {
    const data = new HttpParams()
      .append('selectKey', selectKey);
    return(this.http.post('/searchAlbumPicture/', data));
=======
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
>>>>>>> 01b6c0b5a183bc6cec7ccf339c469d6ef1d906ba
  }
  constructor(
    private http: HttpClient
  ) { }
}
