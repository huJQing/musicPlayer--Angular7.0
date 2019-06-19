import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  isLogin = false;
  userid = '';
  nickname = '';
  nicknameInput = '';
  passwordInput = '';
  /*更新用户信息*/
  updateUserInfo() {
    if (this.nicknameInput !== '' && this.nickname !== this.nicknameInput && this.isLogin) {
      console.log(this.nicknameInput)
      this.userService.updateNickname(this.userid, this.nicknameInput).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 'success') {
            this.nickname = this.nicknameInput;
            window.localStorage.setItem('nickname', this.nicknameInput);
          }
        }
      );
    }

    if (this.passwordInput !== '' && this.isLogin) {
      this.userService.updatePassword(this.userid, this.passwordInput).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 'success') {
            this.passwordInput = '';
          }
        }
      );
    }

  }
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const  userInfo: any = this.userService.isLogin(); /*验证登录状态*/
    if ( userInfo.isLogin ) {
      this.userid = userInfo.userid;
      this.nickname = userInfo.nickname;
      this.nicknameInput = userInfo.nickname;
      this.isLogin = true;
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
