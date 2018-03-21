var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Place = new keystone.List('Place');

Place.add({
	title: { type: String, initial: true, required: true },
	googlePlaceId: { type: String, initial: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	loc: { type: Types.Location, initial: true, index: true }
});

Place.defaultColumns = 'title, googlePlaceId, publishedDate|20%';
Place.register();
