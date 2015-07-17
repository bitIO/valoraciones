/*
 * Change this to your community
 */
community = "Meteor-Spain";
if ( !community ) {
  throw new Meteor.Error(500, "Meetup Community has to be defined");
}
var adminRoles = ["Organizer","Assistant Organizer","Co-Organizer",
  "Event Organizer" ];
// ========================================================================== //

Accounts.onCreateUser(function(options, user){
  var result, accessToken = user.services.meetup.accessToken;
  try {
    result =
      Meteor.http.get('https://api.meetup.com/2/profiles.json/?member_id=' +
        user.services.meetup.id, {
        headers: {
          "User-Agent": "Meteor/1.0",
          "Authorization" : "Bearer " + accessToken
        }
    });
  } catch (error) {
    throw error;
  }

  var profile = result.data.results
      .filter(function (prof) {
        return prof.group.urlname === community;
      })
      .map(function (prof) {
        return {
          name : prof.name,
          photo : prof.photo_url,
          role : _.contains(adminRoles, prof.role) ? "admin" : "member",
          points: 100
        };
      })[0];

  if (profile) {
    user.profile = profile;
    return user;
  } else {
    throw new Meteor.Error(503, "The user has to belong to Meetup Community");
  }
});
