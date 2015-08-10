var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope','$http',function($scope,$http){
	console.log("Hello from controller");

	//func gets data from server, send html with new data
	var refresh = function(){	
		//ask server for data capture the json data with response
		$http.get('/quotelist').success(function(response){
			console.log("I got the data I requested");
			$scope.quotelist = response;
			//send obj with data to html,db stuff is accessible from dom
			console.log(response);
			$scope.quote = "";
		})

	};

	var findAuthor = function (){
		//ask server for data capture the json data with response
		$http.get('/quotelist/author').success(function(uqi_authors){
			console.log("I found the authors I requested");
			$scope.authors = uqi_authors;
			//send obj with data to html,db stuff is accessible from dom
			console.log(uqi_authors);
		})
	};
	var findCategory = function (){
		//ask server for data capture the json data with response
		$http.get('/quotelist/category').success(function(uqi_category){
			console.log("I found the category I requested");
			$scope.categories = uqi_category;
			//send obj with data to html,db stuff is accessible from dom
			console.log(uqi_category);
		})
	};

	var clear = function (){
		//clear input field
		$scope.quote = "";
	}
	//upon loading the page refresh page with new data from server
	refresh();
	findAuthor();
	findCategory();

	//send data from html to server
	$scope.addQuote = function (){
		console.log('sending data from html.');
		console.log("clicked addQuote.");
		$("html, body").animate({ scrollTop: 1500 }, "slow");
		//console.log($scope.quote)
		$http.post('/quotelist', $scope.quote).success(function(response){
			console.log(response);
			refresh();
			findAuthor();
			findCategory();
		})
	};

	//grabs the db id from html angular held data, send to delete route
	$scope.remove = function (id){
		console.log(id);
		$http.delete('/quotelist/' + id).success(function(response){
			refresh();
			findAuthor();
			findCategory();
		})
	};

	//grabs from db id input into html and insert into html 
	$scope.edit = function (id){
		//console.log(id);
		console.log("clicked edit.");
		$("html, body").animate({ scrollTop: 0 }, "slow");
		//hit get route with id
		$http.get('/quotelist/' + id).success(function(response){
			$scope.quote = response;
		});
		clear();
	};

	//updates 
	$scope.update = function (){
		//logs the id
		console.log($scope.quote._id);
		console.log("clicked update.");
		$("html, body").animate({ scrollTop: 1500 }, "slow");
		$http.put('/quotelist/' + $scope.quote._id, $scope.quote).success(function(response){
			refresh();
		})
	};


}]);