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
      console.log(window.localStorage.getItem('userid'));
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
  userLogin(userid: string, passwd: string) {
    const data = new HttpParams()
      .append('userid', userid)
      .append('passwd', passwd);
    return(this.http.post('/music/login/', data));
  }
  /*用户注册*/
  userRegister(userid: string, nickname: string, passwd: string) {
    const data = new HttpParams()
      .append('userid', userid)
      .append('nickname', nickname)
      .append('passwd', passwd);
    return(this.http.post('/music/register/', data));
  }
  constructor(
    private http: HttpClient
  ) { }
}
