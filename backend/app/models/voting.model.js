const mongoose = require("mongoose");
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @swagger
 * definitions:
 *   Voting:
 *     properties:
 *       _id:
 *         type: string
 *       voter:
 *         type: string
 *       candidate:
 *         type: string
 *     required:
 *       - voter
 *       - candidate
 */

var schema = mongoose.Schema({
  voter: {
    type: String,
    required: true,
    ref: "voter"
  },
  candidate: {
    type: String,
    required: true,
    ref: "candidate"
  }
}, {
  timestamps: true
});
schema.plugin(mongoosePaginate);

const Model = mongoose.model("voting", schema);

module.exports.Voting = Model;
module.exports.validateVoting = (body) => {
  return Joi.object({
    voter: Joi.string().required(),
    candidate: Joi.string().required(),
  }).validate(body);
};