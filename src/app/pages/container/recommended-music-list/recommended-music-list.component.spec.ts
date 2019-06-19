import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedMusicListComponent } from './recommended-music-list.component';

describe('RecommendedMusicListComponent', () => {
  let component: RecommendedMusicListComponent;
  let fixture: ComponentFixture<RecommendedMusicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedMusicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedMusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
