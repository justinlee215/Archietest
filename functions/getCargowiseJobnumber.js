exports = async function getCargowiseJobNumber (entityKey)  {
  const cargowiseJobNumber = await context.http.get({ url: `https://ws.pacificgroup.net/restapi/index.cfm/cargowise/url?type=declaration&key=${entityKey}`})
                    .then(res => {
                      const dataParsed  = EJSON.parse(res.body.text());
                      return dataParsed["PK"];
                    })
  return cargowiseJobNumber;
};
      