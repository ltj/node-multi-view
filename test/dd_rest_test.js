var vows = require('vows'),
	assert = require('assert'),
	ddrest = require('../public/javascripts/dd_rest.js');



var suite = vows.describe('dd_rest.js');

suite.addBatch({
	'ddrest.getObjects()': {
		topic: function() {
			ddrest.getObjects(this.callback);
		},
		'should return statuscode 200': function(statusCode, result) {
			assert.equal(statusCode, 200);
		},
		'and result should be an object': function(statusCode, result) {
			assert.isObject(result);
		}
	},
	'ddrest.getStatusUpdates()': {
		topic: function() {
			ddrest.getStatusUpdates(this.callback);
		},
		'should return statuscode 200': function(statusCode, result) {
			assert.equal(statusCode, 200);
		},
		'and result should be an object': function(statusCode, result) {
			assert.isObject(result);
		}
	},
	'ddrest.getRelations()': {
		topic: function() {
			ddrest.getRelations(this.callback);
		},
		'should return statuscode 200': function(statusCode, result) {
			assert.equal(statusCode, 200);
		},
		'and result should be an object': function(statusCode, result) {
			assert.isObject(result);
		}
	},
	'ddrest.getObjectTypes()': {
		topic: function() {
			ddrest.getObjectTypes(this.callback);
		},
		'should return statuscode 200': function(statusCode, result) {
			assert.equal(statusCode, 200);
		},
		'and result should be an object': function(statusCode, result) {
			assert.isObject(result);
		}
	},

});

suite.export(module);