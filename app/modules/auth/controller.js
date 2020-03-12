/*global app*/
app.controller('authController', function($scope, $rootScope, $http, $location, $cookies, loginEventService, H, M, S) {
	if($rootScope.currentUser){
		//$location.path('/');
	}
	
	$scope.forms = {};
	
	$scope.H = H;
	$scope.M = M;
	$scope.S = S;
	
	$scope.data = {};
	$scope.passwordLength = 8;
    $scope.addUpper = true;
    $scope.addNumbers = true;
    $scope.addSymbols = false;
	
	$scope.data.roles = [{id: 'user', title: 'User'}, {id: 'admin', title: 'Administrator'}];
	
	//$scope.loading = false;

	$scope.login = function(){
		//$scope.loading = true;
		// $('.menu-static').hide();
		// $('.menu-loading').show();
		GLOBALS.methods.sideNavLoading();
		
		$http.post(H.SETTINGS.baseUrl + '/users/login', {email: $scope.email, password: $scope.password})
			.then(function(r){
				$scope.error = "";
				if(!r.data.token){
					$scope.error = M.E500;
					//$scope.loading = false;
					return;
				}
				$rootScope.currentUser = r.data;
            
				$rootScope.currentTheme = {
					
					bg : ( H.S.theme.background || 'light'),
					col : ( H.S.theme.color || 'black'),
					alt : ( H.S.theme.alternate || 'light'),
					cont : ( H.S.theme.contrast || 'grey')
				}
            
				$cookies.putObject(H.getCookieKey(), JSON.stringify(r.data));
				GLOBALS.methods.sideNav(null, S.menu);
				$location.path('/');	

			}, function(e){
				if(e && e.data && e.data.error && e.data.error.status){
					if(e.data.error.code == 404 && e.data.error.message == "Not Found"){
						$scope.error = M.LOGIN_API_UNAVAILABLE;
					} else {
						$scope.error = e.data.error.message ? e.data.error.message : e.data.error.status;	
					}
					
				}

				GLOBALS.methods.logout();
				//$scope.loading = false;
			});
	};
	$scope.createPassword = function () {
        var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var symbols = ['!', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
        var finalCharacters = lowerCharacters;
        if ($scope.addUpper) {
            finalCharacters = finalCharacters.concat(upperCharacters);
        }
        if ($scope.addNumbers) {
            finalCharacters = finalCharacters.concat(numbers);
        }
        if ($scope.addSymbols) {
            finalCharacters = finalCharacters.concat(symbols);
        }
        var passwordArray = [];
        for (var i = 1; i < $scope.passwordLength; i++) {
            passwordArray.push(finalCharacters[Math.floor(Math.random() * finalCharacters.length)]);
        };
        $scope.password = passwordArray.join("");
        return $scope.password;
    };
	$scope.forgotPassword = function(){
		//$scope.loading = true;
		$scope.password = $scope.createPassword();
		$http.post(H.SETTINGS.baseUrl + '/users/forgot-password', {email: $scope.email,password:$scope.password})
			.then(function(r){
				$scope.error = M.RECOVERY_EMAIL_SENT;
				//$scope.loading = false;
			}, function(e){
				if(e && e.data && e.data.error && e.data.error.status){
					if(e.data.error.code == 404 && e.data.error.message == "Not Found"){
						$scope.error = M.LOGIN_API_UNAVAILABLE;
					} else {
						$scope.error = e.data.error.message ? e.data.error.message : e.data.error.status;
					}
				}
				//$scope.loading = false;
			});
	};

	$scope.register = function(){
		var route = 'users';
		var data = {username: $scope.data.username, email: $scope.data.email, password: $scope.data.password};
		if(S.enableSaaS) {
			route = 'organizations'; 
			data = {organization: $scope.data.organization, email: $scope.data.email};
		}else{
			if($scope.data.password != $scope.data.confirmPassword){
				$scope.error = "Password and Confirm Password should match!";
				return;
			}
		}
		
		$http.post(H.SETTINGS.baseUrl + '/' + route +'/register', data)
			.then(function(r){
				$scope.error = M.REGISTRATION_EMAIL_SENT;
			}, function(e){
				if(e && e.data && e.data.error && e.data.error.status){
					if(e.data.error.code == 404 && e.data.error.message == "Not Found"){
						$scope.error = M.REGISTER_API_UNAVAILABLE;
					} else {
						$scope.error = e.data.error.message ? e.data.error.message : e.data.error.status;
					}
				}
			});
	};
	
	$scope.logout = function(){
		// GLOBALS.registry.sideNavStatus = false;
		// $('.all-nav').hide(); //CUSTOM
		// $('.menu-static').show();
		// $('.menu-loading').hide();
		GLOBALS.methods.logout();
		
		$cookies.remove(H.getCookieKey());
		delete $rootScope.currentUser;
		$location.path('/sign-in');
	};
	
	GLOBALS.methods.autoFocus();
});


