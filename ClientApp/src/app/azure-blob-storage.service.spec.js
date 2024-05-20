"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var azure_blob_storage_service_1 = require("./azure-blob-storage.service");
describe('AzureBlobStorageService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(azure_blob_storage_service_1.AzureBlobStorageService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=azure-blob-storage.service.spec.js.map