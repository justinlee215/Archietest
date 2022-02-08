exports = async function(arg){

  const URL = `https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/super-search-app-azxkp/service/svcHTTP/incoming_webhook/entityQuery_ip?must=entity:BACF&project=publicTracking,data.BACF,data.QUICKADD,data.B3.RELEASE_DATE&q=${arg.trim()}`;
  const encodedURL = encodeURI(URL);
  
  const dataCA = await context.http.get({ url: encodedURL })
          .then(res => {
            const data  = EJSON.parse(res.body.text());
            
            if (data[0] === undefined) {
              console.log('error, empty array ');
      
              return [];
            }
            //select the part of data needed
            const selectedData = data.map(obj => ({
              "releaseData": obj.data.BACF.publicStatus.statusdate,
              "portEntry": obj.data.BACF.publicStatus.portNo,
              "entityKey": obj.entityKey,
              "custAcctNum": obj.data.BACF.CUST_ACCT,
              "custQuickName": obj.data.BACF.CUST_QUIKNAME,
              "cargoNum": obj.data.BACF.publicStatus.cargonumber,
              "transNum": obj.data.BACF.TRANSNO,
              "returnStatus": obj.data.BACF.publicStatus.returnStatus,
              "returnInfo": obj.data.BACF.publicStatus.returnInfo,
              "BACF": obj.data.BACF.publicStatus.bacf,
              "assignedby": obj.data.QUICKADD.assignedby,
              "assignedto": obj.data.QUICKADD.assignedto,
              "lastUpdatedby": obj.data.QUICKADD.LastUpdateBy,
            }));
            
            console.log('selectedData: ', JSON.stringify(selectedData[0]));
            console.log('selectedData.assignedto:', selectedData[0]["assignedto"]);
            return selectedData;
          });
  
  if (dataCA[0] && dataCA[0].assignedto) {
    const assignedUsername = dataCA[0].assignedto; 
    console.log('assignedUser2: ', assignedUsername )
   
    // const pcbStaff = await context.services.get("mongodb-atlas").db("pcb").collection("pcbStaff").findOne({i2000username: assignedUsername });
    const pcbStaff = await context.http.get({ url: `https://ws.pacificgroup.net/restapi/index.cfm/crm/staffuser?i2000username=${assignedUsername}&apikey=90D41504F703A3D1BDAE6A0EB6734A86`})
                .then(res => {
                    console.log(res.body.text());
                    return EJSON.parse(res.body.text())[0];
                  })
                  .catch(res => {
                    console.log("error: ", res);
                    return null;
                  })
    
    console.log("pcbStaff return: ", pcbStaff);
    console.log("pcbStaff return: ", pcbStaff);
    
    if (pcbStaff !== null) {
      dataCA[0].assignedtoFullname = pcbStaff.fullname;
      
        console.log('pcbStaff: ', JSON.stringify(pcbStaff));  
    console.log('pcbStaff fullname: ', JSON.stringify(pcbStaff.fullname));  
    
    console.log("dataCA: ", JSON.stringify(dataCA));
    }
  }
  
  if (dataCA[0] && dataCA[0].lastUpdatedby) {
    const lastUpdatedbyUser = dataCA[0].lastUpdatedby; 
    console.log('lastUpdatedbyUser: ', lastUpdatedbyUser )
    
    const pcbStaff2 = await context.services.get("mongodb-atlas").db("pcb").collection("pcbStaff").findOne({i2000username: lastUpdatedbyUser });
    
    console.log("pcbStaff return: ", pcbStaff2);
    
    if (pcbStaff2 !== null) {
      dataCA[0].lastUpdatedbyUserFullname = pcbStaff2.fullname;
      
    console.log('pcbStaff2: ', JSON.stringify(pcbStaff2));  
    console.log('pcbStaff2 fullname: ', JSON.stringify(pcbStaff2.fullname));  
    }
  }
 
  return dataCA
};

