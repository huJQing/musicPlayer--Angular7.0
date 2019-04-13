import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recommended-music-list',
  templateUrl: './recommended-music-list.component.html',
  styleUrls: ['./recommended-music-list.component.css']
})
export class RecommendedMusicListComponent implements OnInit {
  navigateMusicList() {
    this.router.navigate(['musicList', '1']);
  }
  constructor(
    private router: Router
  ) {
  }
  ngOnInit() {
  }

}
