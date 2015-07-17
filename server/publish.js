Meteor.publish("talks", function(){
  return Talks.find({},
    {
      sort: {
        affinity: -1
      }
    });
});
