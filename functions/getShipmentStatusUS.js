exports = async function(arg){
  
  const URL = `https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/super-search-app-azxkp/service/svcHTTP/incoming_webhook/entityQuery_ip?must=entity:PCBUSCW&project=data.PCBUSCW,publicTracking&q=${arg.trim()}`;
  const encodedURL = encodeURI(URL);  

  const dataUS = await context.http.get({ url: encodedURL})
    .then(res => {
      console.log('res.body.text(): ', res.body.text())
      
      if (EJSON.parse(res.body.text())[0] === undefined) {
        console.log('error, empty array ');

        return [];
      }
      
      const data  = EJSON.parse(res.body.text());
      
      console.log('data: ',JSON.stringify(data))
      //select the part of data needed
      console.log('array length: ',data.length)
      
      const selectedData = data.map(obj => ({
        "paps": obj.publicTracking[0].meta.SCAC + obj.data.PCBUSCW.billofladinglist,
        "releaseData": obj.publicTracking[0].meta.STATUSDATE,
        "portEntry": obj.data.PCBUSCW.portname,
        "entityKey": obj.entityKey,
        "custAcctNum": obj.data.PCBUSCW.CUST_ACCT,
        "custQuickName": obj.data.PCBUSCW.orgname,
        "consignees": obj.data.PCBUSCW.consignees,
        "carrier": obj.data.PCBUSCW.carrier,
        "statusCargo": obj.data.PCBUSCW.statuscargo,
        "entryNum": obj.data.PCBUSCW.entrynumber,
        "billOfLanding": obj.data.PCBUSCW.billofladinglist,
        "returnStatus": obj.data.PCBUSCW.status,
        "returnInfo": obj.data.PCBUSCW.displaymessage,
        "entity": obj.entity,
        "eadminticketid": obj.data.PCBUSCW.eadminticketid,
        "submitteduser": obj.data.PCBUSCW.submitteduser,
        "assigneduser": obj.data.PCBUSCW.assigneduser,
      }))
      
      console.log('selectedData: ', JSON.stringify(selectedData[0]));
      return selectedData;
    });
    
  if (dataUS[0] && dataUS[0].assigneduser) {
    const assignedUsername = dataUS[0].assigneduser; 
    console.log('assignedUser: ', assignedUsername )

    // const pcbStaff = await context.services.get("mongodb-atlas").db("pcb").collection("pcbStaff").findOne({cargowiseoneusercode: assignedUsername });
    const pcbStaff = await context.http.get({ url: `https://ws.pacificgroup.net/restapi/index.cfm/crm/staffuser?cargowiseoneusercode=${assignedUsername}&apikey=90D41504F703A3D1BDAE6A0EB6734A86`})
                    .then(res => {
                        console.log(res.body.text());
                        return EJSON.parse(res.body.text())[0];
                      })
                      .catch(res => {
                        console.log("error: ", res);
                        return null;
                      })
    
    console.log("pcbStaff return: ", pcbStaff);
    
    if (pcbStaff !== null) {
      dataUS[0].assignedtoFullname = pcbStaff.FULLNAME;
      
      console.log('pcbStaff: ', JSON.stringify(pcbStaff));  
      console.log('pcbStaff fullname: ', JSON.stringify(pcbStaff.FULLNAME));  
      
      console.log("dataUS: ", JSON.stringify(dataUS));
    }
  }
    
  if (dataUS[0] && dataUS[0].submitteduser) {
    const submitteduser = dataUS[0].submitteduser; 
    console.log('submittedUser: ', submitteduser )

    // const pcbStaff2 = await context.services.get("mongodb-atlas").db("pcb").collection("pcbStaff").findOne({cargowiseoneusercode: submitteduser });
    const pcbStaff2 = await context.http.get({ url: `https://ws.pacificgroup.net/restapi/index.cfm/crm/staffuser?cargowiseoneusercode=${submitteduser}&apikey=90D41504F703A3D1BDAE6A0EB6734A86`})
                      .then(res => {
                        console.log(res.body.text());
                        return EJSON.parse(res.body.text())[0];
                      }).catch(err => {
                        console.log("error: ", err);
                        return null;
                      })
  
    console.log("pcbStaff return: ", JSON.stringify(pcbStaff2));

    if (pcbStaff2 !== null) {
      dataUS[0].submitteduserFullname = pcbStaff2.FULLNAME;
      
        console.log('pcbStaff: ', JSON.stringify(pcbStaff2));  
    console.log('pcbStaff fullname: ', JSON.stringify(pcbStaff2.FULLNAME));  
    
    console.log("dataUS: ", JSON.stringify(dataUS));
    }
  }
    
  console.log("dataUS: ", JSON.stringify(dataUS))
  return dataUS
};

