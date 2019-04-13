import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicService} from '../../../services/music/music.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  listId = '';
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.listId = this.activatedRoute.snapshot.paramMap.get('listId');
    console.log(this.listId);
  }

  ngOnInit() {
  }

}
