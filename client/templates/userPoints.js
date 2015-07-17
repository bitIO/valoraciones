Template.userPoints.created = function() {
  this.filter = new ReactiveTable.Filter('affinity', ['affinity']);
}

Template.userPoints.rendered = function() {
  setTimeout(function () {
    $('#affinityToggle').bootstrapToggle();
  }, 500);
}

Template.userPoints.helpers({
  remainingPoints: function(){
    return Meteor.user().profile.points;
  }
});

Template.userPoints.events({
  "change #affinityToggle": function(event, template){
    console.log("affinityToggle");
    var checked = $(event.target).prop('checked');
    if ( checked ) {
      Template.instance().filter.set("true");
    } else {
      template.filter.set("");
      ReactiveTable.clearFilters(['affinity']);
    }

    // $('#toggle-event').change(function() {
    //       $('#console-event').html('Toggle: ' + )
    // })
  }
});
