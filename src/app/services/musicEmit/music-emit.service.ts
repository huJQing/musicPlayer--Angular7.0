import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicEmitService {
  public eventEmit: any;
  constructor() {
    // 定义发射事件
    this.eventEmit = new EventEmitter();
  }
}
