import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let min = Math.floor(value / 6000) + '';
    let seconds = Math.floor((value % 6000) / 100) + '';
    if (Number(min) < 10 ) {
      min = '0' + min;
    }
    if (Number(seconds) < 10 ) {
      seconds = '0' + seconds;
    }
    const time1 =  min + ':' + seconds;
    return time1;
  }

}
