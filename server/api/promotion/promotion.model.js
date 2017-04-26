'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromotionSchema = new Schema({
  key: String,
  val: String,
  description: String,
  imageUrl:String,
  active: Boolean
});

module.exports = mongoose.model('Promotion', PromotionSchema);
