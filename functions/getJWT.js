
exports = async function getToken() {
  const secret = EJSON.parse(context.values.get("googleSecretLink"));

  const { google } = require('googleapis');
   
  let jwtClient = new google.auth.JWT(
    secret.client_email,
    null,
    secret.private_key, ['https://www.googleapis.com/auth/chat.bot']
  );
  
  console.log("JWT: ", JSON.stringify(jwtClient));
  
  let jwtAuthorized = await jwtClient.authorize()
      .then(tokens => {
        console.log("JWT created!")
        return tokens.access_token;
        })
      .catch(err => {
        console.log('Error create JWT hangoutchat');
        return err;
      });
  return jwtAuthorized;
}