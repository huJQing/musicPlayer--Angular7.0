import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*判断用户是否登录*/
  isLogin() {
    let userInfo = {};
    if ( window.localStorage.getItem('userid') !== null ) {
      userInfo = {
        isLogin : true,
        nickname : window.localStorage.getItem('nickname'),
        userid : window.localStorage.getItem('userid'),
      };
      return userInfo;
    } else {
      userInfo = {
        isLogin : false
      };
      return userInfo;
    }
  }
  /*用户登录*/
  userLogin(userId: string, password: string) {
    const data = new HttpParams()
      .append('userId', userId)
      .append('password', password);
    return(this.http.post('/login/', data));
  }
  /*用户注册*/
  userRegister(userId: string, nickname: string, password: string) {
    const data = new HttpParams()
      .append('userId', userId)
      .append('nickname', nickname)
      .append('password', password);
    return(this.http.post('/register/', data));
  }
  /*修改用户昵称*/
  updateNickname(userId, nickname) {
    const data = new HttpParams()
      .append('userId', userId)
      .append('nickname', nickname);
    return(this.http.post('/updateName/', data));
  }
  /*修改用户密码*/
  updatePassword(userId, password) {
    const data = new HttpParams()
      .append('userId', userId)
      .append('password', password);
    return(this.http.post('http://47.100.197.56/updatePassword/', data));
  }
  constructor(
    private http: HttpClient
  ) { }
}
