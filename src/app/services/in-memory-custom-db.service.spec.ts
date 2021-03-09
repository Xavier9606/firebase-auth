import { TestBed } from '@angular/core/testing';

import { InMemoryCustomDbService } from './in-memory-custom-db.service';

describe('InMemoryCustomDbService', () => {
  let service: InMemoryCustomDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryCustomDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
