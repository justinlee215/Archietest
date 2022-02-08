// handles external source calling PUT http call to the endpoint with three arguments either via query or body payload, "to", "from", "message"
// throws error accordingly on different fail cases or success when the "message" was successfully made to the space of the "to" member, "from" source.

exports = async function({ query, _ , body}, response) {

  const badRequest = '{"status": "400", "PROCESSEDSUCCESS": false, "success":false, "error": "incorrect parameters or payload"}'
  const pcbStaffDB = context.services.get("mongodb-atlas").db("chatbot").collection("pcbStaff");
  const spaceRoomDB = context.services.get("mongodb-atlas").db("chatbot").collection("spaceRoom");
  const chatbotListDB = context.services.get("mongodb-atlas").db("chatbot").collection("list");
  
  console.log("pcbStaffDB: ", JSON.stringify(pcbStaffDB));
  console.log("spaceRoomDB: ", JSON.stringify(spaceRoomDB));
  console.log("chatbotListDB: ", JSON.stringify(chatbotListDB));
  

  if (query && Object.keys(query).length !== 0) {
    console.log("--Got Query Webhook for Put Message Request--");
    const {to, from, message} = query
    
    try {
      if (!to || !from || !message) {
        const e = new Error("Recipient: three argument required, 'to', 'from', 'message'");
        response.setStatusCode(400)
        response.setBody(badRequest)
        // e.status = 400;
        console.log(response)
        return response;
      }
      const targetBot = await chatbotListDB.findOne({name: from})
      
      console.log("targetBot: ", targetBot)
      if (!targetBot) {
        response.setStatusCode(400)
        response.setBody(badRequest)
        // e.status = 400;
        console.log(response)
        return response;
      }
      
      //find the spaceName here from mongo Atlas db by seaching for the email
      const targetUser = await pcbStaffDB.findOne({email: to})
                  
      console.log("targetUser: ", JSON.stringify(targetUser));
      // const targetSpace = targetUser.chatSpaceName;
      const spaceDM = targetUser[`space${from}`];
      console.log("spaceDM: ", spaceDM);
      const postMessage = await context.functions.execute("postAsyncMessage", { spaceDM, from, message })
          .then(response => {
            console.log("post Async response return all the way back now!: ", JSON.stringify(response));
            return {
              "message": `Yes! Archie sent gChat message to ${to} the message, ${message} by ${from}`,
              "PROCESSEDSUCCESS":  true,
              "sent": true
            }
          });

      return postMessage;
    }
    catch(e) {
        console.error('postAsyncMessage Failed', e.message, e.statusCode);
        response.setBody(badRequest)
        response.setStatusCode(400)
        return response;
      }
    } 
  else if ( body && EJSON.parse(body.text()) ) {
  console.log("Got Body Payload Webhook for Put Message Request");
    const {to, from, message} = EJSON.parse(body.text());
    
    console.log('body(payload): ', JSON.stringify(EJSON.parse(body.text())));
      try {
        if (!to && !from && !message ) {
          const e = new Error(`"Recipient: 'to', "sender: 'from', "message: 'message" required!`);
          console.log(e)
          response.setStatusCode(400)
          response.setBody(badRequest)
          // response.setBody({"message": "nope"})
          // response.set({"message": "nope"})
          // return response
        }
        
        if (!to ) {
          const e = new Error("Recipient: 'to' argument required");
          response.setStatusCode(400)
          response.setBody(badRequest)
        }
        
        if (!from) {
          const e = new Error("Recipient: 'from' argument required");
          response.setStatusCode(400)
          response.setBody(badRequest)
          return response;
        }
        
        if (!message) {
          const e = new Error("Recipient: 'message' argument required");
          response.setStatusCode(400)
          response.setBody(badRequest)
          return response;
        }
    
        console.log("to, from, message: ", to, from, message);
        
        //find the spaceName here from mongo Atlas db by seaching for the email
        const targetUser = await pcbStaffDB.findOne({email: to})
      
        const targetBot = await chatbotListDB.findOne({name: from})
      
        console.log("targetBot: ", JSON.stringify(targetBot));
        if (!targetBot) {
          response.setStatusCode(400)
          response.setBody(badRequest)
          // e.status = 400;
          console.log(response)
          return response;
        }
      
        console.log("targetUser: ", JSON.stringify(targetUser));
        // const targetSpace = targetUser.chatSpaceName;
        const spaceDM = targetUser[`space${from}`];
        console.log("spaceDM: ", spaceDM);
        
        const postMessage = await context.functions.execute("postAsyncMessage", { spaceDM, from, message })
        .then(response => {
          console.log("메세지 잘 갔다 웹훅 펑션으로 잘 돌아옴: ", JSON.stringify(response));
          return {
            "message": `Yes! Archie sent gChat message to ${to} the message, ${message} by ${from}`,
            "PROCESSEDSUCCESS":  true,
            "sent": true
          }
        });

      return postMessage;
  
      // const doc = context.services.get("mongodb-atlas").db("dbname").collection("coll_name").findOne();

      }
      catch(e) {
        console.error('postAsyncMessage Failed', e.message, e.statusCode);
        response.setBody(badRequest)
        response.setStatusCode(400)
        return response;
      }
    }
  else {
    try {
      console.log('error')
      response.setStatusCode(400)
      response.setBody(badRequest)
    }
    catch(e) {
      response.setStatusCode(400)
      response.setBody(badRequest)
      console.error('postAsyncMessage Failed', e.message, e.statusCode);
      return response;
    }
  }
  console.log('query: ', JSON.stringify(query));
};
