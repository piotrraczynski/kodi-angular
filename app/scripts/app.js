/* global app:true */

'use strict';

/**
 * @ngdoc overview
 * @name kodiAngularApp
 * @description
 * # kodiAngularApp
 *
 * Main module of the application.
 */

var services = angular.module('kodiServices', []);
services.constant('KODI_URL', '192.168.0.18');

var app = angular.module('kodiAngularApp', [
    'ngResource',
    'ngRoute',
    'kodiServices'
  ]);

  app.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/remote', {
        templateUrl: 'views/remote.html',
        controller: 'RemoteCtrl'
      })
      .when('/tvshows', {
        templateUrl: 'views/tvshows.html',
        controller: 'TvShowsCtrl'
      })
      .when('/tvshows/:tvshowId', {
        templateUrl: 'views/showtvshow.html',
        controller: 'TvShowViewCtrl'
      })
      .when('/tvshows/:tvshowId/seasons/:season', {
        templateUrl: 'views/showseason.html',
        controller: 'SeasonViewCtrl'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
      })
      .when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl'
      })
      .when('/music/:artistId', {
        templateUrl: 'views/showartist.html',
        controller: 'ArtistViewCtrl'
      })
      .otherwise({
        redirectTo: '/remote'
      });
  });
