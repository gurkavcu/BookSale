'use strict';

describe('BookCtrl', function () {

 var storageProvider,storageService,scope;

  beforeEach(module('bookSaleApp'));
  beforeEach(module('LocalStorageModule', function( localStorageServiceProvider ) {
      storageProvider = localStorageServiceProvider;
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('BookCtrl', {
      $scope: scope
    });
  }));

  it('should clear all datastorage',inject(function (localStorageService) {
      storageService = localStorageService;
      localStorageService.clearAll();   
  }))

  it('quote count should be equals to 3',function () {    
     expect(scope.quotes.length).toBe(3);
  })

  it('quote count should increment and contains "test quote" ',function () {    
    scope.quote.text="test quote";
    scope.saveQuote();
    expect(scope.quotes.length).toBe(4);
    expect(scope.quotes).toContain("test quote");
  })

  it('quote count should not increment cause contains "test quote" already',function () {    
    scope.quote.text="test quote";
    scope.saveQuote();
    expect(scope.quotes.length).toBe(4);
    expect(scope.quotes).toContain("test quote");
  })
  
});
