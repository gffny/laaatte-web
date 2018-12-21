var _ = require('lodash');
var async = require('async');
var keystone = require('keystone');

var Place = keystone.list('Place');

exports = module.exports = function(req, res) {

	var placeId = req.params.id;

	var rtn = {
		placeList: []
	};

	async.series([

		function(next) {
			Place.model.find().sort('name').exec(function(err, placeList) {
				if (err) {
					console.log('Error finding place: ', err)
				}
				rtn.placeList = placeList;
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
