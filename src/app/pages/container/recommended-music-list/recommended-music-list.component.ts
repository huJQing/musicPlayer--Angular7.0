import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
<<<<<<< HEAD
import {MusicService} from '../../../services/music/music.service';
=======
>>>>>>> 01b6c0b5a183bc6cec7ccf339c469d6ef1d906ba

@Component({
  selector: 'app-recommended-music-list',
  templateUrl: './recommended-music-list.component.html',
  styleUrls: ['./recommended-music-list.component.css']
})
export class RecommendedMusicListComponent implements OnInit {
<<<<<<< HEAD
  recommendedList = [];
  /*获取推荐歌单*/
  getRecommendedList() {
    this.musicService.getRecommendedList().subscribe(
      (data: any) => {
        if (data !== 'error') {
          this.recommendedList = data;
        }
      }
    );
  }
  constructor(
    private router: Router,
    private musicService: MusicService
  ) {
  }
  ngOnInit() {
    this.getRecommendedList();
=======
  navigateMusicList() {
    this.router.navigate(['musicList', '1']);
  }
  constructor(
    private router: Router
  ) {
  }
  ngOnInit() {
>>>>>>> 01b6c0b5a183bc6cec7ccf339c469d6ef1d906ba
  }

}
