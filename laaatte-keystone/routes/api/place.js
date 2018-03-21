var _ = require('lodash');
var async = require('async');
var keystone = require('keystone');

var Place = keystone.list('Place');

exports = module.exports = function(req, res) {

	var placeId = req.params.id;

	var rtn = {
		place: {}
	};

	async.series([

		function(next) {
			Place.model.findById(placeId, function(err, place) {
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
