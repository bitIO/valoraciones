toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

function _changeVotes( talkObj, increase ) {
  var value = increase ? 5 : -5;
  talkObj.Votes += value ;
  if (increase) {
    talkObj.Who.push( Meteor.userId() );
  }
  else {
    var indx = _.indexOf( talkObj.Who, Meteor.userId() );
    talkObj.Who.splice( indx, 1 );
  }

  var update = {
    "$set": {
      "Votes": talkObj.Votes,
      "Who"  : talkObj.Who
    }
  };

  Talks.update(talkObj._id, update, function( error ) {
    if (! error ) {
      Meteor.call("changeRemaingPoints", increase ? -5 : 5);
      if ( increase ) {
        toastr.success("Has dado 5 votos a la charla<br/>" +
          "<strong>" + talkObj.Title + "</strong> ");
      }
      else {
        toastr.warning("Has quitado 5 votos a la charla<br/>" +
          "<strong>" + talkObj.Title + "</strong> ");
      }
    }
  });
}

Template.thumbs.events({
  'click .increment': function () {
    _changeVotes( this, true );
    return false;
  },
  'click .decrease': function () {
    _changeVotes( this, false );
    return false;
  }
});

Template.thumbs.helpers({
  "isMin" : function () { return this.Votes <= 0; },
  "isMax" : function () { return this.Votes >= 100; },
  "canRemoveVotes": function() {
    // only allow remove points the user has given
    return _.indexOf( this.Who, Meteor.userId() ) != -1;
  }
//   "selected" : function () {
//     return Session.equals('selected_player', this._id);
//   },
//   "showFormatted" : function (context) {
//     return context.join(",");
//   }
});
