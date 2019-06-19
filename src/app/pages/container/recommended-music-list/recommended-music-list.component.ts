import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MusicService} from '../../../services/music/music.service';

@Component({
  selector: 'app-recommended-music-list',
  templateUrl: './recommended-music-list.component.html',
  styleUrls: ['./recommended-music-list.component.css']
})
export class RecommendedMusicListComponent implements OnInit {
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
  }

}
