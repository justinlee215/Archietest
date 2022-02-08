//http Async post call 
async function postMessage({ spaceDM, from, message }, token){
  console.log("--- HTTP async post started-----")

  const headers =  {
    "Content-Type": ["application/json"],
    "Authorization": ["Bearer " + token]
  };

  const googleURL = `https://chat.googleapis.com/v1/${spaceDM}/messages`;
  
  console.log('메세지: ', message);
  console.log('투: ', spaceDM);
  console.log('from: ', from);
  
  const cards = context.functions.execute("postAsyncMessageComponent", {message, spaceDM, from})
  
  const httpPost = await context.http.post({ 
    url: googleURL,
    body: cards,
    encodeBodyAsJSON: true,
    headers: headers,
  })
  .then(res => {
    const ejson_body = EJSON.parse(res.body.text());
    console.log('Post Message Sent: ', JSON.stringify(ejson_body));
    return ejson_body;
  })
  .catch(err => {
    console.log('err: ',err);
  });
  
  console.log("httpPost from postMessage method: ", JSON.stringify(httpPost));
  return httpPost;
}

async function getSpaces(headers) {
  //spaces data HTTP GET call, https://chat.googleapis.com/v1/spaces
  const spacesChatbotAdded = await context.http.get({ 
    url: `https://chat.googleapis.com/v1/spaces`,
    encodeBodyAsJSON: true,
    headers: headers,
  })
  .then(res => {
    const ejson_body = EJSON.parse(res.body.text());
    return ejson_body;
  })
  .catch(err => {
    console.log('Catch spaces error: ',err);
  });
  
  // console.log(JSON.stringify(spacesChatbotAdded));
  return spacesChatbotAdded;
}

async function getMembers(headers, space) {
  //members data in 'spaces',  https://chat.googleapis.com/v1/{방 주소 }/members
  const membersData = await context.http.get({ 
    url: `https://chat.googleapis.com/v1/${space}/members`,
    encodeBodyAsJSON: true,
    headers: headers,
  })
  .then(res => {
    return EJSON.parse(res.body.text());
  })
  .catch(err => {
    console.log('Catch members error! ',err);
  });
  
  return membersData;
}

async function getMember(headers, member) {
  //member data 
  const memberData = await context.http.get({ 
    url: `https://chat.googleapis.com/v1/${member}`,
    encodeBodyAsJSON: true,
    headers: headers,
  })
  .then(res => {
    return EJSON.parse(res.body.text());
  })
  .catch(err => {
    console.log('Catch member error! ',err);
  });
  
  return memberData;
}

//main function
exports = async function({ spaceDM, message, from}) {
  //get authentication JWT token from Google
  const token = await context.functions.execute("getJWT");
  
  //example of various types of URLs for Google Chat apis
  const googleURL1 = `https://chat.googleapis.com/v1/spaces`;
  const googleURL2 = `https://chat.googleapis.com/v1/spaces/78_8ToAAAAE`;
  const googleURL3 = `https://chat.googleapis.com/v1/spaces/AAAAMpdlehY/messages/UMxbHmzDlr4.UMxbHmzDlr4`;

  const headers =  {
    "Content-Type": ["application/json"],
    "Authorization": ["Bearer " + token]
  };
  
  const spacesData = await getSpaces(headers);
  const spaces = spacesData.spaces;
  const spacesNames = spaces.map(space => space.name ) //mapping only the list of space names

  console.log("Spaces all Name list: ", spacesNames);
  console.log("Spaces count: ", JSON.stringify(spaces.length));

  const membersData = await getMembers(headers, `spaces/78_8ToAAAAE`);
  const members = membersData.memberships;
  const memberNames = members.map(member => member.name ) // array of members names
  
  // console.log("Members list( in the space ): ", JSON.stringify(members));
  console.log("Members Names(in the space): ", memberNames);
  console.log("Members Count: ", members.length);
  
  const memberData = await getMember(headers, 'spaces/78_8ToAAAAE/members/117942066301599130644')
  console.log('memberData: ', JSON.stringify(memberData));
  console.log('memberData.member: ', JSON.stringify(memberData.member));
  const memberName = memberData.member.displayName;
  console.log("member: ", JSON.stringify(memberName));
  
  // const userData = await getUser(headers, '')

  let counter = 0;
  spacesNames.forEach(space => {
    if (spacesNames[0] === space) {
      // postMessage(space);
      // postMessage(space, message);
      // console.log(space)
    }
    counter ++;
  })

  //calling the async post HTTP
  return await postMessage({ spaceDM, message, from }, token)
    .then(res => {
      console.log("message sent alright: ", JSON.stringify(res));
      return res;
    })
  
  return { "text": `spaces list: ${spacesNames} , total: ${counter} rooms, Announcement sent!` };
};