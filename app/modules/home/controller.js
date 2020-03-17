/*global app*/
app.controller('homeController', function ($scope, $rootScope, H, R) {

	// $controller('homeControllerBase', {
	// 	$rootScope:$rootScope
	// });

    // $('.collapsible').collapsible();
    

	$scope.H = H;
	$scope.M = H.M;

	$scope.data = {
		counters: {
			timesheetsCounter: {
				title: 'TimeSheet',
				value: '...',
				icon: 'timeline',
				background: 'purple',
				color: 'white',
				action: 'timesheets',
				allowedRoles: ['user', 'admin']
			},
			tasksCounter: {
				title: 'Tasks',
				value: '...',
				icon: 'assignment_turned_in',
				background: 'green',
				color: 'white',
				action: 'tasks',
				allowedRoles: ['user']
			},
			projectsCounter: {
				title: 'Projects',
				value: '...',
				icon: 'assignment',
				background: 'primary',
				color: 'white',
				action: 'projects',
				allowedRoles: ['user']
			},
			bugsCounter: {
				title: 'Bugs',
				value: '...',
				icon: 'bug_report',
				background: 'red',
				color: 'white',
				action: 'bugs',
				allowedRoles: ['user']
			},
			leavesCounter: {
				title: 'Leaves',
				value: '...',
				icon: 'note_add',
				background: 'black',
				color: 'white',
				action: 'leaves',
				allowedRoles: ['user','admin']
			},
			
			usersCounter: {
				title: 'Users',
				value: '...',
				icon: 'person',
				background: 'green',
				color: 'white',
				action: 'users',
				allowedRoles: ['admin']
			},
			groupsCounter: {
				title: 'Groups',
				value: '...',
				icon: 'group',
				background: 'gray',
				color: 'white',
				action: 'groups',
				allowedRoles: ['admin']
			},
			departmentsCounter: {
				title: 'Departments',
				value: '...',
				icon: 'portrait',
				background: 'brown',
				color: 'white',
				action: 'departments',
				allowedRoles: ['admin']
			},
			designationsCounter: {
				title: 'Designation',
				value: '...',
				icon: 'assignment',
				background: 'blue',
				color: 'white',
				action: 'designations',
				allowedRoles: ['admin']
			},
			organizationsCounter: {
				title: 'Organizations',
				value: '...',
				icon: 'people_outline',
				background: 'green',
				color: 'white',
				action: 'organizations',
				allowedRoles: ['superadmin']
			}
		},
		bgColors: [
			"blue",
			"red",
			"teal",
			"orange",
			"cyan",
			"brown",
			"pink",
			"purple",
			"green"
			// "light-blue",
			// "amber",
			// "lime",
			// "yellow",
			// "indigo",
			// "grey",
		]

	};
	
     

	function getNextNumber(n) {
		var m = n % $scope.data.bgColors.length;
		return m;
	}
	
	function randomizeTileColors() {
		var count = 0;
		for(var key in $scope.data){
			if($scope.data.hasOwnProperty(key)){
				var val = $scope.data[key];
				if(val.hasOwnProperty('background')){
					val.background = $scope.data.bgColors[getNextNumber(count)];
				}
				count++;
			}
		}
	}
	
	function setCount(resourceName, counterName,name) {
		
		
		if($rootScope.currentUser.role == 'admin' || 'superadmin' )
		{
			R.count(resourceName).then(function(result){
				// console.log("result: -" +resourceName);
			$scope.data.counters[counterName].value = result[0].count;
		//	console.log("result is  : - "+ $scope.data.counters[counterName].value);
		});

		}
		else{
		var email = $rootScope.currentUser.id;
			R.getby(resourceName,email,name).then(function(result){
				$scope.data.counters[counterName].value = result;
				//console.log("result is :-"+result);
				//$scope.ca = result;
			});
		}	
		//
		
	
	}
		

		// $scope.getbi = function(){

		// 	var bug = 'bugs';
		// var email = $rootScope.currentUser.id;
		// 	R.getby(bug,email).then(function(result){
		// 		//console.log("result is :-"+result);
		// 		$scope.ca = result;
		// 	});
		// 	//$scope.ca = $scope.ct;
		// }

	// function getbi(bug,email){
	// 		

	// }
	
	function setCounts(resources) {

		var name = ['user_id','assign_to_id','user_group_id','assign_to_id','user_id'];
		var namee;
			for (var i = 0; i <= resources.length; i++) {
			var resourceName = resources[i];
			var counterName = resourceName + 'Counter';
			var namee = name[i];
			setCount(resourceName, counterName,namee);
		}

		
		
	}
	
	function setCountsDefault(){
		var resources = [];
		for (var k in $scope.data.counters) {
			var v = $scope.data.counters[k];
			if(v.allowedRoles.indexOf($rootScope.currentUser.role) > -1){
				resources.push(v.action);
			}
		}
		setCounts(resources);
	}
	
	$rootScope.currentPage = 1;
	
	
	//Random colors for each tile
	//randomizeTileColors();
	
	//Set counts for each tile
	//setCounts(["tasks", "users"]);
	
	//Set counts for each tile automatically, considering the name of the action and the path of the API is same
	setCountsDefault();


});
