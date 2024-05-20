import { TestBed } from '@angular/core/testing';

import { AzureBlobStorageService } from './azure-blob-storage.service';

describe('AzureBlobStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AzureBlobStorageService = TestBed.get(AzureBlobStorageService);
    expect(service).toBeTruthy();
  });
});
