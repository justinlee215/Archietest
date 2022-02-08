exports = function(body){
 // user information
  const user = {}
  const data = EJSON.parse(body.text());
  const userStringified = body.text();

  user.name = data.user.displayName;
  user.email = data.user.email;
  
  return user;
};