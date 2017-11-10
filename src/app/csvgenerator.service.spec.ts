import { TestBed, inject } from '@angular/core/testing';

import { CsvgeneratorService } from './csvgenerator.service';

describe('CsvgeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvgeneratorService]
    });
  });

  it('should be created', inject([CsvgeneratorService], (service: CsvgeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
