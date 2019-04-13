import {Component, ElementRef, OnInit} from '@angular/core';
import {MusicService} from '../../../services/music/music.service';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';
import {RouterScroller} from '@angular/router/src/router_scroller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modelType = 'login';
  useridInput = '';
  passwordInput = '';
  error = false;
  errorTips = '';
  changeModalType() {
    if (this.modelType === 'login') {
      this.modelType = 'register';
    } else {
      this.modelType = 'login';
    }
    this.error = false;
    this.errorTips = '';
  }
  loginOrRegister() {
    if (this.useridInput === '') {
      this.error = true;
      this.errorTips = '账号不能为空！';
      return 0;
    }
    if (this.passwordInput === '') {
      this.error = true;
      this.errorTips = '密码不能为空！';
      return 0;
    }
    if (this.modelType === 'login' ) {
      this.userService.userLogin(this.useridInput, this.passwordInput).subscribe(
        (data: any) => {
          console.log(data);
          if ( data.status !== 'error' ) {
            window.localStorage.setItem('userid', this.useridInput);
            window.localStorage.setItem('nickname', data.nickname);
            this.modelType = 'login';
            this.el.nativeElement.querySelector('#closeModal').click(); /*关闭modal框*/
            this.router.navigateByUrl('myMusicList');
          } else {
            this.error = true;
            this.errorTips = '账号或密码错误！';
          }
        }
      );
    } else if (this.modelType === 'register') {
      this.userService.userRegister(this.useridInput, this.useridInput, this.passwordInput).subscribe(
        (data: any) => {
          console.log(data);
          if ( data.status !== 'error' ) {
            console.log(data);
            window.localStorage.setItem('userid', this.useridInput);
            window.localStorage.setItem('nickname', this.useridInput);
            this.modelType = 'login';
            this.el.nativeElement.querySelector('#closeModal').click(); /*关闭modal框*/
            this.router.navigateByUrl('myMusicList');
          } else {
            this.error = true;
            this.errorTips = '昵称已存在，请更换昵称！';
          }
        }
      );
    }
  }
  constructor(
    private el: ElementRef,
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit() {
  }

}
