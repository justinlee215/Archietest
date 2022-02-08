const REPLYCOMMENTS = ["Here is the result", "On your command!", "One day at a time..", "Keep Calm and carry on", "Everything will be Alright!", "When are we having coffee?"];
const IMAGEURL = ["https://cdn.pacificgroup.net/res/6e4ad500-1b00-11eb-a920-8125b1a2392f-smgi-ship-clr-1200px.png",
                  "https://cdn.pacificgroup.net/res/cc1c6c10-8681-11eb-9191-65630f880ca6-gmail-flying-p-white-bg.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/USA-flag-cupcake-150.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/canada-container-150.png",
                  "https://cdn.pacificgroup.net/res/95260e70-7242-11ec-bcdf-3f57d19e6568-pcb-archie-profile-pic-360x360.png",
                  "https://cdn.pacificgroup.net/res/ed984b30-e599-11eb-86ca-0164c3ba3da2-pfm-new-400x124.png",
                  ]
const EMOJIS = ["🙉", "😉", "🥰", "😍", "🤟", "🤓", "😺", "💓", ];       
const EMOJIS2 = ["🤔"];

                  

exports = function (arg){
  
  const [user, freightData] = arg;
  
  console.log('user: ', JSON.stringify(user))
  
  console.log("Freight Status: ", JSON.stringify(freightData));
  
  const component = {}
  const cards = [];
  
  if (freightData.length === 0) {
    component.text= "Oh, hm...";
    
    cards.push({
        "header": {
        "title": "Archie",
        "subtitle": "Freight Status",
        "imageUrl": `${IMAGEURL[1]}`,
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
  
    
  if (freightData.length >= 1) {
    component.text =  `Search result for "${user.userTyped}". ${REPLYCOMMENTS[Math.floor(Math.random()*REPLYCOMMENTS.length)]} ${user.name.split(' ')[0]} ${EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}`;
    const data = freightData[0];
  
    cards.push({
      "header": {
        "title": "Archie",
        "subtitle": "Freight Status",
        "imageUrl": IMAGEURL[1],
        "imageStyle": "IMAGE"
      },
  
      "sections": [
        {
          "widgets": [
            // {
            //   "buttons": [
            //     {
            //       "textButton": {
            //         "text": `PCB Freight`,
            //         "onClick": {
            //           "openLink": {
            //             "url": "https://pcbfreight.com"
            //           }
            //         }
            //       }
            //     }
            //   ]
            // },
              {
            "textParagraph": {
                "text": `<b>Tracking #: </b>  <b><font color=\"#42AD46\">${data.entityKey} </font></b>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Updated Date & Time: </b>  <font color=\"#A6192E\">${new Date(data.releaseData).toString()} </font>`
              }
            },
            {
              "textParagraph": {
                "text": `<b>Client: </b>  <font color=\"#A6192E\">${data.custQuickName} </font>`
              }
            },
            {
              "textParagraph": {
                "text": `<b>Cosnignees: </b>  <font color=\"#A6192E\">${data.consignees} </font>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Mode of Transportation: </b>  <font color=\"#A6192E\" size=\"20px\">${data.modeoftrans} </font>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Port of Entry: </b>  <font color=\"#A6192E\" size=\"20px\">${data.portEntry} </font>`
              }
            },
              {
            "textParagraph": {
                "text": `<b>Bill of Landing #: </b>  <font color=\"#A6192E\" size=\"20px\">${data.billOfLanding} </font>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Status: </b>  <b><font color=\"#42AD46\">${data.returnInfo} </font></b>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Status Detail: </b>  <font color=\"#A6192E\">${data.returnStatus} </font>`
              }
            },
            
            {
              // "keyValue": {
              //     "topLabel": "Email,",
              //     "content": `${user.email}`,
              //     "contentMultiline": "false",
              //     "onClick": {
              //         "openLink": {
              //             "url": "https://gmail.com"
              //         }
              //     },
              //     "icon": "EMAIL",
                  "buttons": [{
                      "textButton": {
                        "text": "Track Checker",
                        "onClick": {
                            "openLink": {
                                  "url": `https://www.pcbfreight.com/tools/release-status?q=${data.entityKey}`
                              }
                          }
                        }
                  }
                ]
              }
          // },
          ]
        }
      ],
    })
    
    // cards.push({
    //   "sections": [
    //     {
    //       "widgets": [
    //         // {
    //         //   "buttons": [
    //         //     {
    //         //       "textButton": {
    //         //         "text": `PCB Canada`,
    //         //         "onClick": {
    //         //           "openLink": {
    //         //             "url": "https://pcb.ca"
    //         //           }
    //         //         }
    //         //       }
    //         //     }
    //         //   ]
    //         // },

    //         {
    //           "keyValue": {
    //               "topLabel": "Click,",
    //               "content": `See <b><font color=\"#42AD46\">more results</font></b>`,
    //               "contentMultiline": "false",
    //               "onClick": {
    //                   "openLink": {
    //                       "url": `https://www.pcb.ca/tools/release-status?q=${data.BACF}`
    //                   }
    //               },
    //               "icon": "DESCRIPTION",
    //               // "button": {
    //               //     "textButton": {
    //               //       "text": "PARS Checker",
    //               //       "onClick": {
    //               //           "openLink": {
    //               //                 "url": `https://www.pcb.ca/tools/release-status?q=${data.BACF}`
    //               //             }
    //               //         }
    //               //       }
    //               // }
    //           }
    //       },
    //       ]
    //     }
    //   ],
    // })
   component.cards = cards;
  }
  
    
    console.log('cards: ', JSON.stringify(cards))
    
    return component;
};
