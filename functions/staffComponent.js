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

function getBirthmonth(number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  return months[number - 1];
}

exports = function (arg){
  
  const [user, staffData] = arg;
  
  console.log('user: ', JSON.stringify(user))
  
  const component = {}
  console.log("staffData2: ", JSON.stringify(staffData));
  
  if (staffData) {console.log("count StaffData: ", staffData.length) }
  
  const cards = [];

  // return {"text": JSON.stringify(staffData) };//////////////////////////////////////////////////////////////////////////////////
  
 if (staffData === null || staffData === undefined ) {
  component.text= "Oh, hm...";
    
  cards.push({
      "header": {
        "title": "Archie",
        "subtitle": "Staff Profile",
        "imageUrl": IMAGEURL[0],
        "imageStyle": "IMAGE",
      },
      "sections": [
        {
          "widgets": [
            {
              "textParagraph": {
                  "text": `<font> Could't find anyone for "${user.userTyped}". ${user.name.split(' ')[0]}  ${EMOJIS2[0]} </font>`
              }
            }
          ]
        }
      ]
  });
  
  component.cards = cards;
  } else if ( staffData && staffData.length === 1) {
    if (user.userTyped) {component.text =  `Search result for "${user.userTyped}". ${REPLYCOMMENTS[Math.floor(Math.random()*REPLYCOMMENTS.length)]} ${user.name.split(' ')[0]} ${EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}`;}
    const data = staffData[0];
  
    console.log("data.userprofilepicture: ", data.userprofilepicture);
    
    cards.push({
      "header": {
        "title": "Archie",
        "subtitle": "Staff Profile",
        "imageUrl": IMAGEURL[0],
        "imageStyle": "IMAGE"
      },
  
      "sections": [
        {
          "widgets": [
            {
              "image": { 
                "imageUrl": data.USERPROFILEPICTURE ? encodeURI(data.USERPROFILEPICTURE) : IMAGEURL[1]
                // "imageUrl": data.userprofilepicture ? `https://pcbcrm.pacificgroup.net${encodeURI(data.userprofilepicture)}` : IMAGEURL[1] 
  
                
              }
            },
              {
            "textParagraph": {
                "text": `<b>Name: </b>  <b><font color=\"#42AD46\">${data.FULLNAME} </font></b>`
                // "text": `<b>Name: </b>  <b><font color=\"#42AD46\">${data.fullname} </font></b>`
  
              }
            },
            {
              "textParagraph": {
                "text": `<b>Title: </b>  <font color=\"#A6192E\">${data.EXPERTISE} </font>`
                // "text": `<b>Title: </b>  <font color=\"#A6192E\">${data.expertise} </font>`
              }
            },
            {
              "textParagraph": {
                "text": `<b>Phone #: </b>  <font color=\"#A6192E\">${data.LOCALPH} </font>`
                // "text": `<b>Phone #: </b>  <font color=\"#A6192E\">${data.localph} </font>`
  
              }
            },
            {
            "textParagraph": {
                "text": `<b>Email: </b>  <font color=\"#A6192E\" size=\"20px\">${data.EMAIL} </font>`
                // "text": `<b>Email: </b>  <font color=\"#A6192E\" size=\"20px\">${data.email} </font>`
  
              }
            },
           {
            "textParagraph": {
                "text": `<b>Email Login: </b>  <font color=\"#A6192E\" size=\"20px\">${data.EMAILLOGIN} </font>`
                // "text": `<b>Email: </b>  <font color=\"#A6192E\" size=\"20px\">${data.email} </font>`
  
              }
            },
            {
            "textParagraph": {
                "text": `<b>Company/Team: </b>  <font color=\"#A6192E\" size=\"20px\">${data.DIRECTORYCOMPANY} </font>`
                // "text": `<b>Company/Team: </b>  <font color=\"#A6192E\" size=\"20px\">${data.directorycompany} </font>`
  
              }
            },
            {
            "textParagraph": {
                "text": `<b>I2000 Username: </b>  <font color=\"#A6192E\" size=\"20px\">${data.I2000USERNAME} </font>`
                // "text": `<b>Email Login: </b>  <font color=\"#A6192E\" size=\"20px\">${data.emaillogin} </font>`
  
              }
            },
             {
            "textParagraph": {
                "text": `<b>Cargowise Username: </b>  <font color=\"#A6192E\" size=\"20px\">${data.CARGOWISEONEUSERCODE} </font>`
                // "text": `<b>Email Login: </b>  <font color=\"#A6192E\" size=\"20px\">${data.emaillogin} </font>`
  
              }
            },
            {
            "textParagraph": {
                "text": `<b>Second Language: </b>  <font color=\"#A6192E\">${data.LANGUAGES} </font>`
                // "text": `<b>Second Language: </b>  <font color=\"#A6192E\">${data.languages} </font>`
  
              }
            },
             {
            "textParagraph": {
                "text": `<b>Work Schedule: </b>  <font color=\"#A6192E\">${data.SCHEDULE} ${data.SCHEDULETIME}</font>`
              }
            },
            {
            "textParagraph": {
                "text": `<b>Desk Location: </b>  <font color=\"#A6192E\">${data.LOCATION} ${data.OFFICE} ${data.FLOOR}</font>`
                // "text": `<b>Desk Location: </b>  <font color=\"#A6192E\">To be added </font>`
  
              }
            },
            {
            "textParagraph": {
                "text": `<b>Birth Date: </b>  <font color=\"#A6192E\"> ${data.SHOWBIRTHDAY ? getBirthmonth(data.BIRTHMONTH) + " " + data.BIRTHDAY : " " }   </font>`
                // "text": `<b>Birth Date: </b>  <font color=\"#A6192E\"> ${data.showbirthday ? getBirthmonth(data.birthmonth) + " " + data.birthday : " " }   </font>`
              }
            },
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
  else if (staffData.length > 1 && staffData.length <= 23 ) {
    const searchResultInButtonsArr = [];

    staffData.forEach(data => searchResultInButtonsArr.push(      {
                    "textButton": {
                      "text": `${data.FULLNAME}`,
                      "onClick": {
                        "action": {
                          "actionMethodName": "showChosenStaffComponent",
                          "parameters": [
                            {
                              "key": "name",
                              "value": `${data.FULLNAME}`
                            }
                          ]
                        }
                      }
                    }
                  }));
                  
    cards.push({
      "header": {
        "title": "Archie",
        "subtitle": "Staff Profile",
        "imageUrl": IMAGEURL[0],
        "imageStyle": "IMAGE"
      }
    },
    {
    "sections": [
      {
        "widgets": [
           {
            "textParagraph": {
                "text": `<b>Search Result: </b>  <font color=\"#A6192E\">Please choose</font>`
              }
            },
            {
                "buttons": searchResultInButtonsArr
              },
        ]
      }
    ]
    }
    );
    component.cards = cards;
  console.log("Search Rresult in Array: ", JSON.stringify(searchResultInButtonsArr ));
  } 
  
  console.log('cards: ', JSON.stringify(cards));
    
  return component;
};
