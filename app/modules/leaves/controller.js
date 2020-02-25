app.controller('leavesControllerExtension', function($scope,$route, $controller, $rootScope, $http, $location, Popup, H, M) 
{
    var date = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    $scope.dtmax  = year+"-"+month+"-"+date;
    $scope.data1 = function (start_date, end_date)
    {
        $scope.errMessage = '';
        if (start_date > end_date)
        {
            $scope.errMessage = 'End Date should be greater than start date';
            return false;
        }
    };
    $scope.Visible = false;
    if($rootScope.currentUser.role == 'user')
    {
        $scope.Visible=true;
    }
    $scope.IsVisible = false;
    if($rootScope.currentUser.role == 'admin')
    {
        $scope.IsVisible=true;
    }
    //This function is called when you need to make changes to the new single object.
    $scope.onInit = async function(obj){
        //$scope.data.single is available here. 'obj' refers to the same. It is the new instance of your 'tasks' resource that matches the structure of your 'tasks' API.
        // obj.is_active = 1;
        // obj.is_deleted = 0;   
    };
    //This function is called when you are in edit mode. i.e. after a call has returned from one of your API that returns a single object. e.g http://localhost:8080/api/tasks/1
    $scope.onLoad = async function(obj){
        //$scope.data.single is available here. 'obj' refers to the same. It represents the object you are trying to edit.  
    };
    //This function is called when you are in list mode. i.e. before a call has been placed to one of your API that returns a the paginated list of all objects matching your API.
    $scope.beforeLoadAll = async function(query){
        //This is where you can modify your query parameters.    
        //query.is_active = 1;
        query.is_deleted = 0;
        if($rootScope.currentUser.role !== 'admin')
        {
            query.user_id=$rootScope.currentUser.id;
        }
        //return query;
    };
    //This function is called when you are in list mode. i.e. after a call has returned from one of your API that returns a the paginated list of all objects matching your API.
    $scope.onLoadAll = async function(obj){
        //$scope.data.list is available here. 'obj' refers to the same. It represents the object you are trying to edit.   
        //You can call $scope.setListHeaders(['column1','column2',...]) in case the auto generated column names are not what you wish to display.
        //or You can call $scope.changeListHeaders('current column name', 'new column name') to change the display text of the headers;
    };
    //This function is called before the create (POST) request goes to API
    $scope.beforeSave = async function(obj, next){
        delete obj.user;
        delete obj.leave_type;
        delete obj.status;
        next();
    };
    //This function is called after the create (POST) request is returned from API
    $scope.onSave = async function (obj, next){
        //You can choose not to call next(), thus preventing the page to display the popup that confirms the object has been created.
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
    $scope.removeListHeaders = function(){
        return ['Id','Is Deleted'];
    }

    // If you want to refresh the data loaded in grid, you can call the following method
    // $scope.refreshData();
    
    // If you are using autoRoutes, and you want to override any templates, you may use the following function
    // $scope.setTemplate('list-item', 'app/your-path/your-template.html');
    // $scope.setTemplate('single', 'app/your-path/your-template.html');
    
    // list-item.html template uses the 'td' element which will be rendered inside a 'table' & 'tr'. 
    // If you don't like the layout, and you want to replace it with your own, you can use the following method.
    // Note that if you override the 'list-items', then you have to use ng-repeat or any other mechanism to iterate over your data that is available in $scope.data.list.
    // $scope.setTemplate('list-items', 'app/your-path/your-template.html');
    $scope.a=1
	$scope.remove=function(id){
		var data = {
            is_deleted:$scope.a
		};
		
		$http.put(H.S.baseUrl + '/leaves/' + id,data).then(function(res)
		{
            console.log(data);
            $route.reload();
        },
		function(e) {
			alert("... Error:" + e.data.error.message);
		});
	}
});
