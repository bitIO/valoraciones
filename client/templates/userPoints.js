Template.userPoints.helpers({
  remainingPoints: function(){
    return Meteor.user().profile.points;
  }
});
