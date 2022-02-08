
exports = async function({ query, headers, body}, response) {
  console.log("mainWebHook begin!")
  //call getUserData function
  const userData = context.functions.execute("getUserData", body);
  
  //variables needed through out the app
  const event = EJSON.parse(body.text());
  const eventType = event.type;
  const keyboardEvent = event.message;
  const action = event.action;
  const user = event.user;
  const space = event.space;
  const userEmail = user.email;
  const spaceType = space.type;
  const userName = userData.name;
  const userFirstName = userData.name.split(" ")[0];

  //user keyboard typed input info
  let userTyped;
  if (keyboardEvent) {userTyped = keyboardEvent.argumentText;}
  
  if (keyboardEvent && userTyped) {userData.userTyped = userTyped.trim();}
  
  //mongoDB Atlas data for 1:1 chat list and Gchat "spaces" list which added the bot, Archie-Test
  const pcbStaffDB = context.services.get("mongodb-atlas").db("chatbot").collection("pcbStaff");
  const spaceRoomDB = context.services.get("mongodb-atlas").db("chatbot").collection("spaceRoom");
  
  const emailFoundStaffData = await pcbStaffDB.findOne({email: userEmail});
  const spaceRoomFound = await spaceRoomDB.findOne({name: space.name});
  let textMessage;
  
  console.log("emailFoundStaffData: ", JSON.stringify(emailFoundStaffData));
  console.log("spaceRoomFound: ", JSON.stringify(spaceRoomFound));

  switch (eventType) {
    case "ADDED_TO_SPACE": 
      console.log(`Hello, ${userFirstName} 😀 ${userData.email}👍`);
      textMessage = `Hello, ${userFirstName}.  I am the 'Archie-Test' version! 😀 Do you want to try 'Archie' version, the stable one?`;
      
      //when no user information in "chatbot" DB, "pcbStaff" collection for 1:1 chat for Archie-Test bot
      if (emailFoundStaffData === null && spaceType === "DM" ) {
        pcbStaffDB.insertOne({
          "email": userEmail,
          "name": userName,
          "displayName": user.displayName,
          "avatarUrl": user.avatarUrl,
          "type": user.type,
          "domainId": user.domainId,
          "spaceArchietest": space.name,
        });
        console.log("New Archietest bot 1:1 user information created in the DB");
      }
      
      //when yes user information in "chatbot" DB, "pcbStaff" collection for 1:1 chat but not for Archie-Test botadding  1:1 chat Archie-Test spaceName, then update with the spaceName
      if (emailFoundStaffData  && spaceType === "DM" && emailFoundStaffData.spaceArchieTest === undefined ) {
        pcbStaffDB.updateOne({
          "email": userEmail,
        },
        {
          $set: {
            "spaceArchietest": space.name,
          }
        });
        console.log("Archie-Test bot 1:1 DM space user information addeded in the DB");
      }
      
      //when a space Room is adding Archie-Test bot for the first time into DB
      if (spaceRoomFound === null && spaceType === "ROOM") {
        spaceRoomDB.insertOne({
          name: space.name,
          displayName: space.displayName,
          bots: ["Archietest"]
          
        });
        console.log("new spaceRoom added Archie-Test bot: ", JSON.stringify(spaceRoomFound));
      }
      
      //when a space Room is found in DB but the Archie-Test bot was not included in yet
      if (spaceRoomFound && spaceType === "ROOM" && !spaceRoomFound.bots.includes("Archietest")) {
          spaceRoomDB.updateOne({
            "name": space.name
          },
          {
            $push: { bots: "Archietest" }
          });
        console.log("new spaceRoom added Archie-Test bot: ", JSON.stringify(spaceRoomFound));
      }
      
      return context.functions.execute("greetingComponent", [userData, textMessage]);
    case "MESSAGE":
      textMessage = `Hello, ${userFirstName} 😀  Do you want to try the " / " slash command? `;
      //when no user information in "chatbot" DB, "pcbStaff" collection for 1:1 chat for Archie-Test bot
      if (emailFoundStaffData === null && spaceType === "DM") {
        pcbStaffDB.insertOne({
          "email": user.email,
          "name": user.name,
          "displayName": user.displayName,
          "avatarUrl": user.avatarUrl,
          "type": user.type,
          "domainId": user.domainId,
          "spaceArchietest": space.name,
        });
        console.log("New Archie-Test bot 1:1 user information created in the DB");
      }
      
      //when yes user information in "chatbot" DB, "pcbStaff" collection for 1:1 chat but not for Archie-Test botadding  1:1 chat Archie-Test spaceName, then update with the spaceName
      if (emailFoundStaffData  && spaceType === "DM" && emailFoundStaffData.spaceArchietest === undefined) {
        pcbStaffDB.updateOne({
          "email": user.email,
        },
        {
          $set: {
            "spaceArchietest": space.name,
          }
        });
        console.log("Archie-Test bot 1:1 DM space user information addeded in the DB");
      }
      
        //when a space Room is adding Archie-Test bot for the first time into DB
      if (spaceRoomFound === null && spaceType === "ROOM") {
        spaceRoomDB.insertOne({
          name: space.name,
          displayName: space.displayName,
          bots: ["Archietest"]
        });
        console.log("new spaceRoom added Archie-Test bot: ", JSON.stringify(spaceRoomFound));
      }
      
      //when a space Room is found in DB but the Archie-Test bot was not included in yet
      if (spaceRoomFound && spaceType === "ROOM" && !spaceRoomFound.bots.includes("Archietest")) {
          spaceRoomDB.updateOne({
            "name": space.name
          },
          {
            $push: { bots: "Archietest" }
          });
          
          console.log("new spaceRoom added Archie-Test bot: ", JSON.stringify(spaceRoomFound));
      }
      
      if (keyboardEvent.slashCommand) {
        const textMessage = `Can't find anything like that. ${userFirstName} 🙄  Want to try again? `;
        try {
          switch (parseInt(keyboardEvent.slashCommand.commandId)) {
            case 1: 
              console.log('Case1 PARS/Cananda slash command!');
              if (userTyped) {
                //call getShipmentStatusCA and return appropriate info with user requested
                const shipmentData = await context.functions.execute("getShipmentStatusCA", userTyped);
                const shipmentComponent = context.functions.execute("shipmentCAComponent", [userData, shipmentData]);
  
                return shipmentComponent;
              } else {
                return context.functions.execute("greetingComponent", [userData, textMessage]);
              }
              break;
            case 2: 
              console.log('Case2 US slash command!')
              if (userTyped) {
                //call getShipmentStatusUS Component and return appropriate info with user requested
                const shipmentData = await context.functions.execute("getShipmentStatusUS", userTyped);
                // return shipmentData; //////////////////////////////////////////////////////////////////////////////////////////
                const shipmentComponent = context.functions.execute("shipmentUSComponent", [userData, shipmentData]);
                
                return shipmentComponent;
              } else {
                return context.functions.execute("greetingComponent", [userData, textMessage])
              }
              break;
            case 3: 
              console.log('Case3 slash command!')
              if (userTyped) {
                //call eAdmin Component and return appropriate info with user requested
                const freightData = await context.functions.execute("getFreightStatus", userTyped);
                console.log('freightData: ', JSON.stringify(freightData))
                const freightComponent = context.functions.execute("freightComponent", [userData, freightData]);
                
                return freightComponent;
              } else {
                return context.functions.execute("greetingComponent", [userData, textMessage])
              }
              break;
            case 4: 
              console.log('Case4 EAdmin slash command!')
              if (userTyped) {
                //call eAdmin Component and return appropriate info with user requested
                const eAdminData = await context.functions.execute("getEadminData", userTyped);
                // return eAdminData; ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////testing simple text output
                const eAdminComponent = context.functions.execute("eAdminComponent", [userData, eAdminData]);
                
                return eAdminComponent;
              } else {
                return context.functions.execute("greetingComponent", [userData, textMessage])
              }
              break;
            case 5: 
              console.log('Case5 Staff Profile slash command!')
              if (userTyped) {
                //call staffData Component and return appropriate info with user requested
                const staffData = await context.functions.execute("getStaffData", userTyped);
                console.log("staffData: ", JSON.stringify(staffData));
                // return staffData; ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////testing simple text output
                
                const staffComponent = context.functions.execute("staffComponent", [userData, staffData]);
                
                return staffComponent;
              } else {
                return context.functions.execute("greetingComponent", [userData, textMessage])
              }
              break;
            case 6:
              console.log('Case 6 PostAnnouncement slash command!');
              
              if (userTyped) {
                const spaceDM = space.name;
                const from = "Archietest"
                const message = userTyped;
                const request = await context.functions.execute("postAsyncMessage", {message, spaceDM, from})
                            .then(res => {
                              console.log("Completed message from Webhook again: ", JSON.stringify(res))
                              return {"text": JSON.stringify(res)};
                            })
                            .catch(err => {
                              console.log("error: ", err)
                              return {"text: ": JSON.stringify(err)};
                            });
                return request;
              } else {
                return context.functions.execute("greetingComponent", [userData, textMessage])
              }
              break;
            default: 
              console.log('default.....');
              break;
          }
        }catch(e) {
          console.log("catch error from mainWebHoookPostChat method: ", e) 
        }
        console.log("After / command whole cycle");
      }
      return context.functions.execute("greetingComponent", [userData, textMessage]);
    case "CARD_CLICKED": 
      console.log("card clicked!")
  
      const sender = keyboardEvent.sender.displayName;
      const image = keyboardEvent.sender.avatarUrl;
      
      if (action.actionMethodName === "showChosenStaffComponent") {
        console.log("action.parameters.name: ", action.parameters[0].value);
      }
    
      const staffData = await context.functions.execute("getStaffData", action.parameters[0].value);
      console.log("staffData: ", JSON.stringify(staffData));
    
      const staffComponent = context.functions.execute("staffComponent", [userData, staffData]);
    
      return staffComponent;
    default: 
      // textMessage = `Hello, ${userFirstName} 😀  Do you want to try the " / " slash command? `;
      // return context.functions.execute("greetingComponent", [userData, textMessage]);
      console.log("default....")
  }  
}

