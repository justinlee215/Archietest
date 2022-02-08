exports = async function(arg){
  
  const URL = `https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/super-search-app-azxkp/service/svcHTTP/incoming_webhook/entityQuery_ip?must=entity:PFMCW&project=data.PFMCW,publicTracking&q=${arg.trim()}`;
  const encodedURL = encodeURI(URL);
  
  const dataFreight = await context.http.get({ url: encodedURL})
    .then(res => {
      console.log('text: change2', res.body.text())
      
      if (EJSON.parse(res.body.text())[0] === undefined) {
        console.log('error, empty array ');
        return [];
      }
      
      const data  = EJSON.parse(res.body.text());
      
      // return {"text": res.body.text() } //////////////////////////
      
      console.log('data: change2',JSON.stringify(data))
      //select the part of data needed
      console.log('array length: ',data.length)
      
      const selectedData = data.map(obj => ({
        "releaseData": obj.publicTracking[0].meta.STATUSDATE,
        "portEntry": obj.publicTracking[0].meta.PORTNAME,
        "entityKey": obj.entityKey,
        "custQuickName": obj.data.PFMCW.orgname,
        "consignees": obj.data.PFMCW.consignees,
        "modeoftrans": obj.data.PFMCW.modeoftransport,
        "statusCargo": obj.data.PFMCW.statuscargo,
        "entryNum": obj.data.PFMCW.entrynumber,
        "billOfLanding": obj.data.PFMCW.billofladinglist,
        // "cargoNum": obj.data.PFMCW.cargonumber,
        // "transNum": obj.data.PFMCW.TRANSNO,
        "returnStatus": obj.publicTracking[0].meta.RETURNSTATUS,
        "returnInfo": obj.publicTracking[0].meta.RETURNINFO,
        "entity": obj.entity,
        "eadminticketid": obj.data.PFMCW.eadminticketid,
      }))
      console.log('selectedData: change2', selectedData)
      return selectedData;
    });
  console.log("dataFreight: ", JSON.stringify(dataFreight))
  return dataFreight
};

