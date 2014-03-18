angular.module('bookSaleApp')
.directive('selectpicker', function() {
    return {
        restrict: 'A',        
        link : function (scope, element, attrs) {
            $(function(){
                element.selectpicker();
            });
        }
 
    }
});