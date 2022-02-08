
exports = async function(arg){
  
  const URL = `https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/super-search-app-azxkp/service/svcHTTP/incoming_webhook/entityQuery_ip?entity=eadmin&project=data.ticket&info=1&limit=2&fulltext=match&q=${arg.trim()}`;
  const encodedURL = encodeURI(URL); 
  const encodedURLComponent =`https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/super-search-app-azxkp/service/svcHTTP/incoming_webhook/entityQuery_ip?entity=eadmin&project=data.ticket&info=1&limit=2&fulltext=match&q=${encodeURIComponent(arg.trim())}`;
  
  console.log('encodedURL: ', encodedURLComponent)
  
  const dataEAdmin = await context.http.get({ url: encodedURLComponent})
    .then(res => {

      const dataResult = {};
      
      const dataParsed  = EJSON.parse(res.body.text());
      const dataInfo = EJSON.parse(res.body.text()).info;
      
      if (dataParsed.info.found === 0) {
        console.log('error, empty array');

        return [];
      }
      else {
           // return {"text": JSON.stringify(dataParsed.result) } /////////////////////////////////////////////////////////////
      
      //adding data info results
      dataResult.quantityFound = dataInfo.found;
      
      console.log('data: ', JSON.stringify(dataParsed.result))
      
      //select the part of data needed
      console.log('array length: ', dataParsed.result.length)
      console.log('data info: ', JSON.stringify(dataInfo))
      
      const selectedData = dataParsed.result.map(obj => ({
  
        "_id": obj._id,
        "title": obj.data.ticket.Title,
        "createdTime": obj.data.ticket.Created,
        "custUserId": obj.data.ticket.CustomerUserID,
        "ticketNum": obj.data.ticket.TicketNumber,
        "entityKey": obj.entityKey,
      }))
      console.log('selectedData: ', selectedData);
  
      
      dataResult.data = selectedData;
      // console.log('entity key: ', selectedData.data[0].entityKey)
      
      return dataResult;
      }
    })
    // .catch(err => console.log('error from fetching catch: ', err))
  console.log("dataSelected: ", JSON.stringify(dataEAdmin));
  
  return dataEAdmin;
};


