Template.navbar.helpers({});


Template.navbar.events({

  'click #import': function(event, template) {
    event.preventDefault(); 
    Papa.parse(template.find('#csv-file').files[0], {
          header: true,
          delimiter : "|",
          complete: function(results) {
              
            if (results.data.errors) {
              console.error("Something wrong with csv: ", results.data.errors);
            } else {
              Meteor.call("addTalks",results.data, function (err, result) {
                if (err) {
                  console.log(err);
                }
              });
            }
              
          },
          skipEmptyLines: true
      });
   }

});