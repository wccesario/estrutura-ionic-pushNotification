// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, RequestsService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    cordova.plugins.backgroundMode.configure({
      silent: true
    });

    cordova.plugins.backgroundMode.setDefaults({
      title:  "Titulo - Fixed notification",
      text:   "Text for the fixed notification"
    });
    
    cordova.plugins.backgroundMode.enable();


    pushNotification = window.plugins.pushNotification;


    window.onNotification = function(e){

      // console.log('notification received');
       
      switch(e.event){
        case 'registered':
          if(e.regid.length > 0){
            
            var device_token = e.regid;
            RequestsService.register(device_token).then(function(response){
              // alert('registered!' + device_token);
              // document.write('<p>'+ device_token +'</p>');
            });
          }
        break;

        case 'message':
          $scope.doRefresh = function() {
              $http.get('url')
               .success(function(newFeeds) {
                 $scope.feeds = newFeeds;
               })
               .finally(function() {
                 // Stop the ion-refresher from spinning
                 $scope.$broadcast('scroll.refreshComplete');
               });
           };
        break;

        case 'error':
          alert('error occured');
        break;

      }
    };


    window.errorHandler = function(error){
      alert('an error occured');
    }

    //sender id = Google Cloud Messaging
    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'senderID': '{seu_id_de_desenvolvedor_do_google}',
        'ecb': 'onNotification'
      }
    );


  });



})
.controller("listagemFeeds", function($scope, $http) {

    var base_url = 'http://app.inobox.com.br/index.php/feed/list_feed';

    $http.post(base_url)
        .success(function(response){
          $scope.feeds = response;          
        })

    $scope.doRefresh = function() {
        $http.get('http://app.inobox.com.br/index.php/feed/list_feed')
         .success(function(newFeeds) {
           $scope.feeds = newFeeds;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
     };


});
