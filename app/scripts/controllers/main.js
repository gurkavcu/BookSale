'use strict';

var bookSaleApp = angular.module('bookSaleApp');

var months = ["Jan","Feb","Mar","Apr","May","Jun","July","Agu","Sep","Oct","Dec"];

bookSaleApp.controller('BookCtrl', function($scope, $http , $interval, $timeout, localStorageService) {

  var quoteDict;
  var rotateIndex = 0; 

  $scope.products = { "product" : {} };
  $scope.showQuoteInput = false; 
  $scope.showQuotes = false;
  $scope.quote = { "text" : ""  };
  $scope.activeQuote = "Add your favourite quote from the book";

  /**
  * Load book data and create quote array with the help of existing localStorageValues.
  * Using static book data for serverless demo
  *
    $http.get('../books/book.json').success(function(data) {
      $scope.book = data;
      $scope.productTypes = formatProductTypes();  
      $scope.products.product =  $scope.productTypes[0];
      quoteDict = getOrCreateQuoteDict();
      $scope.quotes = getQuotesArray(quoteDict);    
  	  updateSelectBoxes();
  });
  */
  var loadBook = function() {
      $scope.book = bookData;
      $scope.productTypes = formatProductTypes();  
      $scope.products.product =  $scope.productTypes[0];
      quoteDict = getOrCreateQuoteDict();
      $scope.quotes = getQuotesArray(quoteDict);    
      updateSelectBoxes();
  }

  /**
  *	Add this quote to dictionary and scope if this quote doesnt exist
  */
  var addQuote = function(quote) {
  	if(!quoteDict[$scope.book.isbn][quote]) {
  		quoteDict[$scope.book.isbn][quote] = 1;
  		$scope.quotes.push(quote);
  		localStorageService.set($scope.book.isbn,quoteDict);
  	}  	
  }

  /**
  *	 Return our dictionary as a simple quoteArray
  */
  var getQuotesArray = function(dict) {
  	var quotes = [];
    angular.forEach(dict[$scope.book.isbn], function(value, key){ 
  	   quotes.push(key);
    }, quotes);
    return quotes;
  }

  /**
  *  Our quote dictionary format is like { isbn : { isbn : { quote1 : 1 , quote2 : 1 , .... } } }
  **/
  var getOrCreateQuoteDict = function() {
  	var quotes = localStorageService.get($scope.book.isbn) || {};
  	angular.forEach($scope.book.quotes, function(value, key){ 
  	   var getOrCreateQuotes = quotes[$scope.book.isbn] || {};
       getOrCreateQuotes[value.quote] = 1 ;       
       quotes[$scope.book.isbn] = getOrCreateQuotes;
     }, quotes);
  	return quotes;
  }

  /**
  * This will create product select box.
  */
  var formatProductTypes = function() {
  	var publish_date = new Date(Date.parse($scope.book.publication_date));
  	var products = [];
  	angular.forEach($scope.book.products, function(value, key){    	
       var name = String.format("{0},{1},{2}",value.type,publish_date.getFullYear(),value.price);
       var type = value.type;
       this.push({"name" : name, "type" : type , "value" : value});       
     }, products);
  	return products;
  }

  $scope.publishText = function() {
  	var publish_date = new Date(Date.parse($scope.book.publication_date));
  	return String.format("Published {0} {1} , {2} pages", months[publish_date.getMonth()],publish_date.getFullYear(),$scope.book.pages);
  }

  $scope.showQuote = function() {
  	$scope.showQuoteInput = true;
  }

  $scope.showAllQuotes = function() {
  	$scope.showQuotes = !$scope.showQuotes;
  	$timeout(function(){ window.scrollTo(0,document.body.scrollHeight); },100);  	
  }

  $scope.saveQuote = function() {
  	addQuote($scope.quote.text);  	
  	$scope.quote.text = "";	
  	$scope.showQuoteInput = false;
  }

  $scope.closeQuote = function() {  
    $scope.quote.text = "";	
  	$scope.showQuoteInput = false;
  }

  var rotateQuotes = function() {
  	 if($scope.quotes && $scope.quotes.length) {
  	 	$scope.activeQuote = $scope.quotes[rotateIndex % $scope.quotes.length];
  	 	if(rotateIndex++ > 1000 )
  	 	   rotateIndex = 0;
  	 }
  	 else {
  	 	$scope.activeQuote = "Add your favourite quote from the book";
  	 }
  }


  /**
  *	TODO :
  * This fixes directive binding issue when the anchor link clicked. 
  * Without this selectBox binding resets to intial state.  
  */
  $scope.$on("$routeChangeSuccess", function (event, current, previous) { 
  	 updateSelectBoxes();
  });

  /**
  * Rotate quote array every 4 sec
  */
  $interval(rotateQuotes,4000);
  rotateQuotes();
  loadBook();
  
});



