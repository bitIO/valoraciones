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
          label : "Título",
          tmpl: Template.title,
        },
        {
          key : "Description",
          label : "Descripción",
          tmpl: Template.description,
        },
        {
          key: "tags",
          label: "Etiquetas",
          tmpl: Template.tags
        },
        {
          key: "techs",
          label: "Technologías",
          tmpl: Template.techs,
          hidden : true
        },
        {
          key : "Level",
          label: "Nivel",
          hidden : true
        },
        {
          key : "Type",
          label: "Tipo",
          hidden : true
        },
        {
          key : "Language",
          label: "Idioma",
          hidden : true
        },
        {
          key : "Votes",
          "label": "Votos"
        },
        {
          key: 'ThumbsUp',
          label : 'Votar',
          tmpl : Template.thumbs

        },
        {
          key: 'Author1',
          label : 'Autor1',
          hidden : true
        },
                {
          key: 'Author2',
          label : 'Autor2',
          hidden : true
        },
        {
          key: 'Author3',
          label : 'Autor3',
          hidden : true
        },
        {
          key: 'Author4',
          label : 'Autor4',
          hidden : true
        },
                {
          key: 'DescAuthor1',
          label : 'DescAutor1',
          hidden : true
        },
                {
          key: 'DescAuthor2',
          label : 'DescAutor2',
          hidden : true
        },
        {
          key: 'DescAuthor3',
          label : 'DescAutor3',
          hidden : true
        },
        {
          key: 'DescAuthor4',
          label : 'DescAutor4',
          hidden : true
        },
        {
          key: 'affinity',
          label : 'Afinidad?',
          hidden : true
        }
      ],
      filters: ['affinity'],
      multiColumnSort : true
    };
  }
});

var subscription;
Template.leaderboard.created = function () {
   if ( Meteor.user() ) {
     subscription = this.subscribe("talks", function() {
       $("#loading").css("display", "none");
       $(".container-fluid.leaderboard").css("display", "block");
       $('#affinityToggle').bootstrapToggle('on')
     });
   }
};
Template.leaderboard.destroyed = function () {
  subscription.stop();
};
