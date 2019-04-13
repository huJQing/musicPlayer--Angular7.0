import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicControlComponent } from './music-control.component';

describe('MusicControlComponent', () => {
  let component: MusicControlComponent;
  let fixture: ComponentFixture<MusicControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
