exports = async function(arg){
  
  const [ reqQuery, user ] = arg;
  
  const URL = `https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/super-search-app-azxkp/service/svcHTTP/incoming_webhook/tracking?q=${reqQuery.trim()}`;
  
    const dataCA = await context.http.get({ url: URL})
      .then(res => {
        const data  = res.body.text();
        
        const dataOutput = {};
        
        //select the part of data needed
        const parsedData = EJSON.parse(data).REQUESTVALIDATED[0];  
        
        dataOutput.portNumber = parsedData.PORTNO;
        dataOutput.trackingService = parsedData.TRACKINGSERVICE; 

        dataOutput.returnInfo = parsedData.RETURNINFO;
        dataOutput.returnStatus = parsedData.RETURNSTATUS;
        
        dataOutput.statuscode = parsedData.STATUSCODE;
        
        dataOutput.statusDate = parsedData.STATUSDATE;
        dataOutput.requestDate = parsedData.REQUESTDATE;
        dataOutput.fdastatusmsg = parsedData.FDASTATUSMSG;
        dataOutput.direction = parsedData.DIRECTION;
        dataOutput.trackingNumber = parsedData.TRACKINGNUMBER;
        dataOutput.BACF = parsedData.BACF;
        dataOutput.company = parsedData.COMPANY;
        dataOutput.cargoNumber = parsedData.CARGONUMBER ;
        dataOutput.SCAC = parsedData.SCAC;
        dataOutput.transNumber = parsedData.TRANSNO;
        
        dataOutput.portCity = parsedData.portCity;
        dataOutput.portState = parsedData.PORTSTATE;
        dataOutput.entryNumber = parsedData.ENTRYNO ;
        dataOutput.type = parsedData.TYPE;
        dataOutput.SCNNUM = parsedData.SCNNUM;
        
        //combine userData to the new object as well
        dataOutput.userName = user.name;
        dataOutput.userEmail = user.email;
        dataOutput.userTyped = reqQuery.trim();
        
        console.log("dataOutput: ", JSON.stringify(dataOutput));
        return dataOutput;
      });

    return dataCA
};

