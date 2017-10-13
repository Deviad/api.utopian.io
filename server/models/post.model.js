import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Post Schema
 */
const PostSchema = new mongoose.Schema({
  abs_rshares: {
    type: Number,
    required: true,
  },
  active: {
    type: String,
    required: true,
  },
  active_votes: {
    type: Array,
    required: false,
  },
  allow_curation_rewards: {
    type: Boolean,
    required: true,
  },
  allow_replies: {
    type: Boolean,
    required: true,
  },
  allow_votes: {
    type: Boolean,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  author_reputation: {
    type: Number,
    required: true,
  },
  author_rewards: {
    type: Number,
    required: true,
  },
  beneficiaries: {
    type: Array,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  body_length: {
    type: Number,
    required: true,
  },
  cashout_time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  children_abs_rshares: {
    type: Number,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  curator_payout_value: {
    type: String,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  json_metadata: {
    type: Object,
    required: true,
  },
  last_payout: {
    type: String,
    required: true,
  },
  last_update: {
    type: String,
    required: true,
  },
  max_accepted_payout: {
    type: String,
    required: true,
  },
  max_cashout_time: {
    type: String,
    required: true,
  },
  net_rshares: {
    type: Number,
    required: true,
  },
  net_votes: {
    type: Number,
    required: true,
  },
  parent_author: {
    type: String,
    required: false,
  },
  parent_permlink: {
    type: String,
    required: true,
  },
  pending_payout_value: {
    type: String,
    required: true,
  },
  percent_steem_dollars: {
    type: Number,
    required: true,
  },
  permlink: {
    type: String,
    required: true,
  },
  promoted : {
    type: String,
    required: true,
  },
  reblogged_by: {
    type: Array,
    required: false,
  },
  replies: {
    type: Array,
    required: false,
  },
  reward_weight: {
    type: Number,
    required: true,
  },
  root_comment: {
    type: Number,
    required: true,
  },
  root_title: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  total_payout_value: {
    type: String,
    required: true,
  },
  total_pending_payout_value: {
    type: String,
    required: true,
  },
  total_vote_weight: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  vote_rshares: {
    type: Number,
    required: true,
  },
});

PostSchema.method({
});

PostSchema.statics = {
  get(permlink) {
    return this.findOne({ permlink })
      .exec()
      .then((post) => {
        if (post) {
          return post;
        }
        const err = new APIError('No such post exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  countAll({ query = {} } = {}) {
    return this.count(query).exec();
  },
  list({ skip = 0, limit = 50, query = {}, sort = { created: -1 }} = {}) {
    console.log(query)
    return this.find(query)
      .sort(sort)
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export default mongoose.model('Post', PostSchema);
