exports = async function(arg){
  
  const searchStaffURL =`https://ws.pacificgroup.net/restapi/index.cfm/crm/staffuser?keyword=${encodeURI(arg.trim())}&apikey=90D41504F703A3D1BDAE6A0EB6734A86`
  const pcbStaffURL = 'https://ws.pacificgroup.net/restapi/index.cfm/crm/staffuser?idn=1&apikey=90D41504F703A3D1BDAE6A0EB6734A86'
  
  console.log("arg from getStaffData: ", arg)
  
  let keyword = arg.trim();
  let fname = keyword.split(' ')[0];
  let lname = keyword.split(' ')[1];

  //++++++++++++++++++++++This is a part of the RESTAPI search code+++++++++++++++++++++++
  //for the character limit for restapi restapi search less than three, returning error
  if (keyword.length < 3) {
    return null;  
  }
 
  console.log("typed: ", keyword);
  console.log("fname: ", fname);
  console.log("lname: ", lname);
  
  //---------------------This is a part of the mongoDB search code-----------------------------
  // const pcbStaffs = context.services.get("mongodb-atlas").db("pcb").collection("pcbStaff")
  
  //++++++++++++++++++++++This is a part of the RESTAPI search code+++++++++++++++++++++++++++
  const pcbStaffFromPremise = await context.http.get({url: searchStaffURL})
        .then(res=> {
          console.log("hmm", JSON.stringify(res.body.text()))
          if (res !== undefined && res !== null) {
            console.log('staff info from premiseDB: ', JSON.stringify(res.body.text()))
            // return {"text": "error, this is a server error, please try again next time"}
            // return EJSON.parse(res.body.text())[0];
            return EJSON.parse(res.body.text());
          } else {
            return null;
          }
          })
        .catch(err=> {
          console.log('err for premiseDB: ', err);
          return null;
          });
  console.log('pcbStaffFromPremise: ', JSON.stringify(pcbStaffFromPremise));
  
  return pcbStaffFromPremise;
  // return {"text": JSON.stringify(pcbStaffFromPremise)}

  //---------------------This is a part of the mongoDB search code-----------------------------
  // const firstData = await pcbStaffs.findOne({ fullname: { $regex: keyword, $options: 'i' } });
  // let secondData;
  // let thirdData;
  // if (firstData !== null) {
  //   console.log("firstData: ", JSON.stringify(firstData));
  //   return firstData;
  // } else {
  //   secondData = await pcbStaffs.findOne({ fname: { $regex: fname, $options: 'i' } });
  //     console.log("secondData: ", JSON.stringify(secondData));
  //   if (secondData !== null) {
  //     return secondData;
  //   } else {
  //     thirdData = await pcbStaffs.findOne({ fullname: { $regex: lname === undefined || lname === null ? fname : lname, $options: 'i' } });
  //     console.log("thirdData: ", JSON.stringify(thirdData));
  //     return thirdData;
  //   }
  // }
};