import { TestBed } from '@angular/core/testing';

import { MusicEmitService } from './music-emit.service';

describe('MusicEmitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicEmitService = TestBed.get(MusicEmitService);
    expect(service).toBeTruthy();
  });
});
