import { TestBed, inject } from '@angular/core/testing';

import { Auth.Service.TsService } from './auth.service.ts.service';

describe('Auth.Service.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.Service.TsService]
    });
  });

  it('should be created', inject([Auth.Service.TsService], (service: Auth.Service.TsService) => {
    expect(service).toBeTruthy();
  }));
});
