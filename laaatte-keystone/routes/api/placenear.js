var _ = require('lodash');
var async = require('async');
var keystone = require('keystone');

var Place = keystone.list('Place');

exports = module.exports = function(req, res) {

	var point = [req.params.latitude, req.params.longitude];
	var maxDistance = 1000;

	var rtn = {
		place: {}
	};

	async.series([

		function(next) {
			Place.model.find({
					"loc.geo": {$near: {$geometry: { type: "Point", coordinates: point }, $maxDistance: maxDistance}}})
			.exec(function(err, place) {
				if (err) {
					console.log('Error finding place: ', err)
				}
				rtn.place = place;
				return next();
			});
		}

	], function(err) {
		if (err) {
			rtn.err = err;
		}
		res.json(rtn);
	});
}
