/*global app*/
//The name of the controller should be plural that matches with your API, ending with ControllerExtension. 
//Example: your API is http://localhost:8080/api/tasks then the name of the controller is tasksControllerExtension.
//To register this controller, just go to app/config/routes.js and add 'tasks' in 'easyRoutes' or 'autoRoutes' array.
//
//The main difference in 'easyRoutes' and 'autoRoutes' is that 'autoRoutes' generates complete CRUD pages, where as in 'easyRoutes'
//you need to provide templates inside 'app/modules/tasks' folder. If you want to keep your templates somewhere else, you can pick
//'autoRoutes' and then override the templates using setTemplate function.
//Note that for 'autoRoutes', it is not even required to write Controller Extensions unless you want to modify the behaviour.
app.controller('timesheetsControllerExtension', function($scope,$filter, $controller, $rootScope, $http, $location, Popup, H, M) {
    
    //This function is called when you need to make changes to the new single object.
    $scope.onInit = async function(obj){
        //$scope.data.single is available here. 'obj' refers to the same. It is the new instance of your 'tasks' resource that matches the structure of your 'tasks' API.
        obj.is_active = 1;
    };
    

    
        // $scope.data = [{
        //   name: 1,
        //   startTime: "",
        //   endTime: "",
        //       diff:""
        // }, {
        //   name: 2,
        //   startTime: "",
        //   endTime: "",
        //       diff:""
        // }];
          
        $scope.updateDiff = function(start,end) {
          var abcd = computeDiff(start,end);
            //var abcd = end-start;
        //    var navu = new Date(abcd);
        //    console.log("navu"+navu);
          $scope.data.single.total_hours = abcd/60000/60 + " hours";
          console.log(abcd);
        }
      
         function computeDiff(start, end) {
            // alert(start);
           if (start && end) {
               console.log(start);
               console.log(end);
        //     // var s_hr = start.split(":")[0];
        //     // var s_min = start.split(":")[1];
        //     // var e_hr = end.split(":")[0];
        //     // var e_min = end.split(":")[1];
            return  end - start;
        //     //return Math.abs((parseInt(e_hr) - parseInt(s_hr)) * 60) + Math.abs(parseInt(e_min) - parseInt(s_min))
           }
         }
      
    //This function is called when you are in edit mode. i.e. after a call has returned from one of your API that returns a single object. e.g http://localhost:8080/api/tasks/1
    $scope.onLoad = async function(obj){
        //$scope.data.single is available here. 'obj' refers to the same. It represents the object you are trying to edit.
        
    };
    
    //This function is called when you are in list mode. i.e. before a call has been placed to one of your API that returns a the paginated list of all objects matching your API.
    $scope.beforeLoadAll = async function(query){
        //This is where you can modify your query parameters.    
        //query.is_active = 1;
        //return query;

        if($rootScope.currentUser.role !== 'admin')
        {
            query.user_id=$rootScope.currentUser.id;
        }
    };

    //This function is called when you are in list mode. i.e. after a call has returned from one of your API that returns a the paginated list of all objects matching your API.
    $scope.onLoadAll = async function(obj){
        //$scope.data.list is available here. 'obj' refers to the same. It represents the object you are trying to edit.
        
        //You can call $scope.setListHeaders(['column1','column2',...]) in case the auto generated column names are not what you wish to display.
        //or You can call $scope.changeListHeaders('current column name', 'new column name') to change the display text of the headers;
        
        // for(var i in obj)
        for (var i=0;i < $scope.data.list.length;i++){
            obj[i].hours = $filter('date')(obj[i]["time_from"]-obj[i]["time_to"], 'hh') ; 
            obj[i].minutes = $filter('date')(obj[i]["time_from"]-obj[i]["time_to"], 'mm') ;
            obj[i].seconds = $filter('date')(obj[i]["time_from"]-obj[i]["time_to"], 'ss') ;
          }


        // obj.time_from= $rootScope.currentUser.time_from;
        // obj.time_to = $rootScope.currentUser.time_to;
        // obj.total_hours= obj.time_to - obj.time_from;

        $scope.diff = function (){
            //You can choose not to call next(), thus preventing the page to display the popup that confirms there has been an error.
            // next();
            var t1=new Date($("#time_from").val());
            var t1=new Date($("#time_to").val());
            var timediff = time_to.getTime()- time_from.getTime();
            alert("Success");
        }; 


        //try


        

        // function testCtrl($scope) {
        //     $scope.data.single.total_hours = "";
        //     $scope.$watch("data.single.time_from", function(newValue, oldValue) {
        //       $scope.diff = computeDiff(newValue, $scope.data.single.time_to);
        //     });
        //     $scope.$watch("data.single.time_to", function(newValue, oldValue) {
        //       $scope.diff = computeDiff($scope.data.single.time_from, newValue);
        //     });
          
        //     function computeDiff(startTime, endTime) {
        //       if (startTime && endTime) {
        //         var s_hr = startTime.split(":")[0] || 0;
        //         var s_min = startTime.split(":")[1] || 0;
        //         var e_hr = endTime.split(":")[0] || 0;
        //         var e_min = endTime.split(":")[1] || 0;
          
        //         return Math.abs((parseInt(e_hr) - parseInt(s_hr)) * 60) + Math.abs(parseInt(e_min) - parseInt(s_min))
        //       }
        //     }
        //   }


    };

    


    // $scope.ashow = function (){
    //     //You can choose not to call next(), thus preventing the page to display the popup that confirms there has been an error.
    //     // next();
    //     if($rootScope.currentUser.role == "admin")
    //     {
    //         return true;
    //     }
    // };    

    
    //This function is called before the create (POST) request goes to API
    $scope.beforeSave = async function(obj, next){
        //You can choose not to call next(), thus rejecting the save request. This can be used for extra validations.
        
        delete obj.user;
        next();
    };

    //This function is called after the create (POST) request is returned from API
    $scope.onSave = async function (obj, next){
        //You can choose not to call next(), thus preventing the page to display the popup that confirms the object has been created.
        
        console.log(obj);
        next();
    };
    
    //This function is called before the update (PUT) request goes to API
    $scope.beforeUpdate = async function(obj, next){
        //You can choose not to call next(), thus rejecting the update request. This can be used for extra validations.
        next();
    };

    //This function is called after the update (PUT) request is returned from API
    $scope.onUpdate = async function (obj, next){
        //You can choose not to call next(), thus preventing the page to display the popup that confirms the object has been updated.
        next();
    };
    
    //This function will be called whenever there is an error during save/update operations.
    $scope.onError = async function (obj, next){
        //You can choose not to call next(), thus preventing the page to display the popup that confirms there has been an error.
        next();
    };
    
    // If the singular of your title is having different spelling then you can define it as shown below.
    // $scope.getSingularTitle = function(){
    //     return "TASK";
    // }

    // If you want don't want to display certain columns in the list view you can remove them by defining the function below.
    // $scope.removeListHeaders = function(){
    //     return ['is_active'];
    // }

    // If you want to refresh the data loaded in grid, you can call the following method
    // $scope.refreshData();
    
    // If you are using autoRoutes, and you want to override any templates, you may use the following function
    // $scope.setTemplate('list-item', 'app/your-path/your-template.html');
    // $scope.setTemplate('single', 'app/your-path/your-template.html');
    
    // list-item.html template uses the 'td' element which will be rendered inside a 'table' & 'tr'. 
    // If you don't like the layout, and you want to replace it with your own, you can use the following method.
    // Note that if you override the 'list-items', then you have to use ng-repeat or any other mechanism to iterate over your data that is available in $scope.data.list.
    // $scope.setTemplate('list-items', 'app/your-path/your-template.html');
    

});
