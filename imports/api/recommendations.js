import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';
 
export const Recommendations = new Mongo.Collection('recommendations');

Recommendations.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('recommendations', function recommendationsPublication() {
    return Recommendations.find();
  });
}

Meteor.methods({
  'recommendations.insertRecommentation'(user, results, name) {
    check(user, Object);
    check(name, String);
    check(results, Array);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Recommendations.insert({
      user: user,
      query: name,
      results: results
    });
  },
});