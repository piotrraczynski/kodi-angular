/* global services:true */

'use strict';

services.service('TvShow', ['KodiWS', '$q', function(KodiWS, $q) {
  var fields = ['title', 'genre', 'year'];
  var tvshow = {
    all: function() {
      var deferred = $q.defer();
      KodiWS.send('VideoLibrary.GetTVShows', { properties: fields }).then(function(data) {
        deferred.resolve(data.tvshows);
      });
      return deferred.promise;
    },
    find: function(tvshowId) {
      var deferred = $q.defer();
      KodiWS.send('VideoLibrary.GetTVShowDetails', { properties: fields, tvshowid: parseInt(tvshowId) }).then(function(data) {
        tvshow = data.tvshowdetails;
        KodiWS.send('VideoLibrary.GetSeasons', { properties: ['season', 'episode', 'watchedepisodes'], tvshowid: parseInt(tvshowId) }).then(function(data) {
          tvshow.seasons = data.seasons;
          deferred.resolve(tvshow);
        });
      });
      return deferred.promise;
    }
  };
  return tvshow;
}]);