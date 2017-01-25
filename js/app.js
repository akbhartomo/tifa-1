angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.step1', {
    url: '/data-karyawan?token&userId',
    views: {
      'tab-step1': {
        templateUrl: 'templates/step1.html',
        controller: 'step1Ctrl'
      }
    }
  })

  .state('tab.step2', {
      url: '/data-domisili',
      views: {
        'tab-step2': {
          templateUrl: 'templates/step2.html',
          controller: 'step2Ctrl'
        }
      }
    })

  .state('tab.step3', {
    url: '/data-pekerjaan',
    views: {
      'tab-step3': {
        templateUrl: 'templates/step3.html',
        controller: 'step3Ctrl'
      }
    }
  })

  .state('tab.step4', {
    url: '/multiguna',
    views: {
      'tab-step4': {
        templateUrl: 'templates/step4.html',
        controller: 'step4Ctrl'
      }
    }
  })

  .state('tab.step5', {
    url: '/penyedia',
    views: {
      'tab-step5': {
        templateUrl: 'templates/step5.html',
        controller: 'step5Ctrl'
      }
    }
  })
  
  .state('tab.ketentuan', {
    url: '/ketentuan',
    views: {
      'tab-step5': {
        templateUrl: 'templates/ketentuan.html',
        controller: 'ketentuanCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/data-karyawan?token&userId');

})


.directive("limitTo", [function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
          var limit = parseInt(attrs.limitTo);
          angular.element(elem).on("keypress", function(e) {
              if (this.value.length == limit) e.preventDefault();
          });
      }
    }
}]);

