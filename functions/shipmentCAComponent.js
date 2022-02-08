const REPLYCOMMENTS = ["Here is the result", "On your command!", "One day at a time..", "Keep Calm and carry on", "Everything will be Alright!", "When are we having coffee?"];
const IMAGEURL = ["https://cdn.pacificgroup.net/res/6e4ad500-1b00-11eb-a920-8125b1a2392f-smgi-ship-clr-1200px.png",
                  "https://cdn.pacificgroup.net/res/cc1c6c10-8681-11eb-9191-65630f880ca6-gmail-flying-p-white-bg.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/USA-flag-cupcake-150.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/canada-container-150.png",
                  "https://cdn.pacificgroup.net/res/95260e70-7242-11ec-bcdf-3f57d19e6568-pcb-archie-profile-pic-360x360.png",
                  ]
const EMOJIS = ["🙉", "😉", "🥰", "😍", "🤟", "🤓", "😺", "💓", ];       
const EMOJIS2 = ["🤔"];

                  

exports = function (arg){
  
  const [user, shipmentData] = arg;
  
  console.log('user: ', JSON.stringify(user))
  
  console.log("from shipmentCAComponent: ", JSON.stringify(shipmentData));
  
  const component = {}
  const cards = [];
  
  if (shipmentData.length === 0) {
    component.text= "Oh, hm...";
    
    cards.push({
        "header": {
        "title": "Archie",
        "subtitle": `Canada Shipment Oh Canada`,
        "imageUrl": IMAGEURL[3],
        "imageStyle": "IMAGE"
        }, 
        "sections": [
          {
            "widgets": [
              {
                "textParagraph": {
                    "text": `<font> Could't find anything for "${user.userTyped}". ${user.name.split(' ')[0]}  ${EMOJIS2[0]} </font>`
                }
              }
            ]
          }
        ]
         });
    component.cards = cards;
   }  
  
    
  if (shipmentData.length >= 1) {
   console.log('shipment length: ', shipmentData.length) 
  
    console.log('more than one case: ')

    component.text =  `Search result for "${user.userTyped}". ${REPLYCOMMENTS[Math.floor(Math.random()*REPLYCOMMENTS.length)]} ${user.name.split(' ')[0]} ${EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}`;
    const data = shipmentData[0];
  
    cards.push({
      "header": {
        "title": "Archie",
        "subtitle": `Canada Shipment`,
        "imageUrl": IMAGEURL[3],
        "imageStyle": "IMAGE"
      },
  
      "sections": [
        {
          "widgets": [
            {
            "textParagraph": {
                "text": `<b>BACF #: </b>  <b><font color=\"#42AD46\">${data.BACF}</font></b>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Updated Date & Time: </b>  <font color=\"#A6192E\">${data.releaseData}</font>`
              }
            },
            {
              "textParagraph": {
                "text": `<b>Client: </b>  <font color=\"#A6192E\">${data.custQuickName}</font>`
              }
            },
            {
              "textParagraph": {
                "text": `<b>Client Acc#: </b>  <font color=\"#A6192E\">${data.custAcctNum}</font>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Port of Entry: </b>  <font color=\"#A6192E\" size=\"20px\">${data.portEntry}</font>`
              }
            },
              {
            "textParagraph": {
                "text": `<b>Transaction #: </b>  <font color=\"#A6192E\" size=\"20px\">${data.transNum}</font>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Assigned to: </b>  <b><font color=\"#42AD46\">${data.assignedtoFullname ? data.assignedtoFullname + "(" + data.assignedto + ")" : "Not Available"}</font></b>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Last Updated by: </b>  <b><font color=\"#42AD46\">${data.lastUpdatedbyUserFullname ? data.lastUpdatedbyUserFullname + "(" + data.lastUpdatedby + ")" : "Not Available"}</font></b>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Status: </b>  <b><font color=\"#42AD46\">${data.returnStatus}</font></b>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Status Detail: </b>  <font color=\"#A6192E\">${data.returnInfo}</font>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Cargo Control#: </b>  <font color=\"#A6192E\">${data.cargoNum}</font>`
              }
            },
           {
            "keyValue": {
                "topLabel": `Take me to`,
                "content": `<b><font color=\"#1e88e5\">Quick Add </font></b>`,
                "icon": "STAR",
                "contentMultiline": "false",
                "onClick": {
                    "openLink": {
                        "url": `https://applications.pacificgroup.net/CAdb/CAdb-met-bacf2.cfm?bacf=${data.BACF}`
                    }
                }
              }
            },
            
            {
              "buttons": [{
                  "textButton": {
                    "text": "PARS Checker",
                    "onClick": {
                        "openLink": {
                              "url": `https://www.pcb.ca/tools/release-status?q=${data.BACF}`
                          }
                      }
                    }
              },
              ]
          },
          ]
        }
      ],
    })
   component.cards = cards;
  }
  
    
    console.log('cards: ', JSON.stringify(cards))
    
    return component;
};