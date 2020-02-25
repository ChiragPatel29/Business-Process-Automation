/*global app*/
'use strict';
//The name of the controller should be plural that matches with your API, ending with ControllerExtension. 
//Example: your API is http://localhost:8080/api/tasks then the name of the controller is tasksControllerExtension.
//To register this controller, just go to app/config/routes.js and add 'tasks' in 'easyRoutes' array.
var abc;

app.controller('myprofileController', function($scope, $route, $controller, $rootScope, $http, $routeParams, $location, Popup, H, M) {
    
    //This function is called when you need to make changes to the new single object.
    $scope.onInit = function(obj){
        //$scope.data.single is available here. 'obj' refers to the same. It is the new instance of your 'tasks' resource that matches the structure of your 'tasks' API.
        //obj.is_active = 1;
    };
    
    //This function is called when you are in edit mode. i.e. after a call has returned from one of your API that returns a single object. e.g http://localhost:8080/api/tasks/1
    $scope.onLoad = function(obj){
        //$scope.data.single is available here. 'obj' refers to the same. It represents the object you are trying to edit.
        
    };
    
    //This function is called when you are in list mode. i.e. before a call has been placed to one of your API that returns a the paginated list of all objects matching your API.
    $scope.beforeLoadAll = function(query){
        //This is where you can modify your query parameters.    
        //query.is_active = 1;
        //return query;
    };

    //This function is called when you are in list mode. i.e. after a call has returned from one of your API that returns a the paginated list of all objects matching your API.
    $scope.onLoadAll = function(obj){
        //$scope.data.list is available here. 'obj' refers to the same. It represents the object you are trying to edit.
        
        //You can call $scope.setListHeaders(['column1','column2',...]) in case the auto generated column names are not what you wish to display.
        //or You can call $scope.changeListHeaders('current column name', 'new column name') to change the display text of the headers;
    };
    
    //This function is called before the create (POST) request goes to API
    $scope.beforeSave = function(obj, next){
        //You can choose not to call next(), thus rejecting the save request. This can be used for extra validations.
        next();
    };

    //This function is called after the create (POST) request is returned from API
    $scope.onSave = function (obj, next){
        //You can choose not to call next(), thus preventing the page to display the popup that confirms the object has been created.
        next();
    };
    
    //This function is called before the update (PUT) request goes to API
    $scope.beforeUpdate = function(obj, next){
        //You can choose not to call next(), thus rejecting the update request. This can be used for extra validations.
        next();
    };

    //This function is called after the update (PUT) request is returned from API
    $scope.onUpdate = function (obj, next){
        //You can choose not to call next(), thus preventing the page to display the popup that confirms the object has been updated.
        next();
    };
    
    //This function will be called whenever there is an error during save/update operations.
    $scope.onError = function (obj, next){
        //You can choose not to call next(), thus preventing the page to display the popup that confirms there has been an error.
        next();
    };
    
    // If the singular of your title is having different spelling then you can define it as shown below.
    // $scope.getSingularTitle = function(){
    //     return "TASK";
    // }

    // If you want don't want to display certain columns in the list view you can remove them by defining the function below.
    $scope.removeListHeaders = function(){
        return ['Id','Qualification','Image','Description','Address1','Address2','City','State','Createdat','Updatedat','Users'];
    }


    $scope.data = {};
    $scope.data.list = [];
    $scope.data.limit = 10;
    // $rootScope.currentPage = 1;
    $scope.data.currentPage = 1;
    $scope.data.pages = [];
    $scope.data.pagesCount = 0;


    $scope.setActive = function (i) {
        return ($rootScope.currentPage == i) ? 'active' : 'waves-effect';
      };
    
      $scope.listAll = function (currentPage) {
        // if (!currentPage) {
        //       $rootScope.currentPage = 1;
        // } else {
        //   $rootScope.currentPage = currentPage;
        // }
        
        // console.log("0::"+currentPage)
            if (!currentPage) {
            //   console.log("1::"+currentPage)
            //   console.log("root::"+$rootScope.currentPage)
              if(!$rootScope.currentPage){
              if (!($scope.data.pages.indexOf($rootScope.currentPage) > -1)) {
                // console.log("root1::"+$rootScope.currentPage)
                if ($rootScope.currentPage > 0) {
                //   console.log("root2::"+$rootScope.currentPage)
                //   console.log("pagecount::"+$scope.data.pagesCount)
                  $rootScope.currentPage = $scope.data.pages[$scope.data.pagesCount - 1];
                //   console.log("2::"+$rootScope.currentPage)
                } else {
                  $rootScope.currentPage = 1;
                //   console.log("3::"+$rootScope.currentPage)
                }
              }
            }
            else{
              $rootScope.currentPage = $rootScope.currentPage;
            }
            } else {
              $rootScope.currentPage = currentPage;
            //   console.log("4::"+$rootScope.currentPage)
            }
        
            // console.log("final::"+$rootScope.currentPage)
            // console.log("limit::"+$scope.data.limit)
            if(!$scope.d){
                $scope.d = $scope.data.list.slice(($rootScope.currentPage - 1) * $scope.data.limit, $rootScope.currentPage * $scope.data.limit)        
            }
            else{
                $scope.d = $scope.data.list.slice(($rootScope.currentPage - 1) * $scope.data.limit, $rootScope.currentPage * $scope.data.limit)
            }
        
        //var dataQueryParam = { limit: $scope.data.limit, offset: ($rootScope.currentPage - 1) * $scope.data.limit };
        // console.log($scope.d)
      }
    
      $scope.listAllPrev = function() {
        if (($scope.currentPage - 1) > 0) {
            $scope.listAll($scope.currentPage - 1);
        }
    }
    $scope.listAllNext = function() {
        if (($scope.currentPage + 1) <= $scope.data.pages.length) {
            $scope.listAll($scope.currentPage + 1);
        }
    }

    // If you want to refresh the data loaded in grid, you can call the following method
    // $scope.refreshData();
    $scope.getdietitians = function() {

        $http.get(H.S.baseUrl + '/dietitians').then(function(res) {

            $scope.record = res.data.length;
            $scope.data.list = res.data;
            $scope.data.pagesCount = parseInt(($scope.data.list.length - 1) / $scope.data.limit) + 1;
            $scope.data.pages = [];
            for (var i = 0; i < $scope.data.pagesCount; i++) {
                 $scope.data.pages.push(i + 1);
             }
             $scope.d = $scope.data.list.slice(($rootScope.currentPage - 1) * $scope.data.limit, $rootScope.currentPage * $scope.data.limit)
        }, function(e) {
            alert("... Error:" + e.data.error.message)
        });

    }

    $scope.getSingledietitian = function(){
        if ($routeParams.id > 0) 
        {
    
            $http.get(H.S.baseUrl +'/dietitians/?id=' +$routeParams.id).then(function(res) 
            {
                //$scope.passwordData.message = H.M.PASSWORD_CHANGED;
                //console.log( $scope.recipe)
                $scope.diet = res.data[0]  
                console.log($scope.diet);  
                
            }, function(e) 
            {
                alert("... Error:" + e.data.error.message)
            });
         }
    }

    $scope.locked = !$scope.locked;
    $scope.toggleLock = function() {
        $scope.locked = !$scope.locked;
        if(!$scope.locked){
            GLOBALS.methods.autoFocus();
        }            
    };

    $scope.onErrorBase = function(obj) {
        $scope.showDialog(null, M.ERROR_TITLE, M.SAVED_ERROR, M.SAVED_OK, M.SAVED_CANCEL, function() {
            $scope.locked = false;
        }, function() {
            $location.path($scope.currentRoute)
        });
    };

    $scope.onSaveBase = function(diet) {
        console.log("HEllo");
        diet.image=abc;
        console.log(diet.contact_no.length);
        if(diet.contact_no.length >10 || diet.contact_no.length <10 || isNaN(diet.contact_no)){
            alert("Enter Valid Phone Number");
        }
        else{
        $http.post(H.S.baseUrl + '/dietitians',diet).then(function(res) {
            console.log("Added Successfully");
        }, function(e) {
            console.log("Error in Add");
        });

        $scope.showDialog(null, M.SAVED_TITLE, M.SAVED_MESSAGE, M.SAVED_OK, M.SAVED_CANCEL, function() {
            console.log("inside show Dialog");
            $route.reload();
        }, function() {
            // console.log("Hello Agian");
            $location.path("dietitians");
        });
    }
    };

    $scope.onUpdateBase = function(diet) {
        diet.image=abc;
        $http.put(H.S.baseUrl + '/dietitians', diet).then(function(res) {
        }, function(e) {
            alert("... Error:" + e.data.error.message)
        });
        
        $scope.showDialog(null, M.SAVED_TITLE, M.SAVED_MESSAGE, M.SAVED_OK, M.SAVED_CANCEL, function() {
            console.log("inside show Dialog of update");
            $route.reload();
        }, function() {
            // console.log("Hello Agian");
            $location.path("dietitians");
        });
    };

    $scope.showDialog = function(ev, title, content, okText = "OK", cancelText = "Cancel", okHandler, cancelHandler) {
        Popup.show({
                title: title,
                body: content,
                buttons: [{
                    text: okText,
                    theme: 'success',
                    click: function(callback, btn, data) {
                        if (okHandler) okHandler();
                        if (callback) callback(btn);
                    },
                    cleanup: function(data) {

                    }
                }, {
                    text: cancelText,
                    theme: 'warning',
                    click: function(callback, btn, data) {
                        if (cancelHandler) cancelHandler();
                    }
                }],
                scope: $scope,
                spinner: true,
                close: function(data) {

                }
            })
    };







    $scope.sendMail = function(diet){
        
      }







});


app.directive("myfileInput", function($parse, $http, S, upload) {
    return {
        restrict: 'EA',
        link: function(scope, element, attr) {
            element.bind("change", function(event) {
                var files = event.target.files;
                // console.log('start');
                // console.log(element[0].files[0]);
                // console.log('end');
                var formData = new FormData();
                formData.append('file', element[0].files[0]);
                upload(scope.url || S.baseUrl + '/files', formData, function(r) {
                    if (scope.callback) scope.callback()(r);
                    //  console.log(r.data);
                     abc=r.data.file;
                     console.log(abc);
                     //this.recipe.image.push( r.data.file);
                });
            });
        }
    }
});
app.factory('upload', function($http) {
    return function(url, data, callback) {
        $http({
            url: url,
            method: "POST",
            data: data,
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response) {
            if (callback) callback(response);
        }, function(e) {
            if (callback) callback(e);
        });
    };
});
