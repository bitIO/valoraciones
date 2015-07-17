Template.leaderboard.events({
  'click .notRelated' : function() {
    Meteor.call("markAsNotRelated" , this._id, function (err) {
      if (err) {
        console.error(err);
      }
    });
  }
});

Template.leaderboard.helpers({
  "settings" : function() {
    return {
      collection : Talks,
      rowsPerPage : 5,
      showFilter : true,
      showColumnToggles : true,
      fields:  [
        {
          key : "title",
          label : "Title",
          "tmpl": Template.title
        },
        {
          key : "Description",
          label : "Description",
          cellClass : "justify"
        },
        {
          "key": "tags",
          "label": "Tags",
          "tmpl": Template.tags
        },
        {
          "key": "techs",
          "label": "Techs",
          "tmpl": Template.techs
        },
        "Level",
        "Type",
        "Language",
        "Votes",
        {
          key: 'ThumbsUp',
          label : 'ThumbsUp',
          tmpl : Template.thumbs

        },
        {
          key: 'Author1',
          label : 'Author1',
          hidden : true
        },
                {
          key: 'Author2',
          label : 'Author2',
          hidden : true
        },
        {
          key: 'Author3',
          label : 'Author3',
          hidden : true
        },
        {
          key: 'Author4',
          label : 'Author4',
          hidden : true
        },
                {
          key: 'DescAuthor1',
          label : 'DescAuthor1',
          hidden : true
        },
                {
          key: 'DescAuthor2',
          label : 'DescAuthor2',
          hidden : true
        },
        {
          key: 'DescAuthor3',
          label : 'DescAuthor3',
          hidden : true
        },
        {
          key: 'DescAuthor4',
          label : 'DescAuthor4',
          hidden : true
        }
      ]

    };
  }
});

var subscription;
Template.leaderboard.created = function () {
   if ( Meteor.user() ) {
     subscription = this.subscribe("talks", function() {
       $("#loading").css("display", "none");
       $(".container-fluid.leaderboard").css("display", "block");
     });
   }
};
Template.leaderboard.destroyed = function () {
  subscription.stop();
};
