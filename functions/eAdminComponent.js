const REPLYCOMMENTS = ["Here is the result", "On your command!", "One day at a time..", "Keep Calm and carry on", "Everything will be Alright!", "When are we having coffee?"];
const IMAGEURL = ["https://cdn.pacificgroup.net/res/6e4ad500-1b00-11eb-a920-8125b1a2392f-smgi-ship-clr-1200px.png",
                  "https://cdn.pacificgroup.net/res/cc1c6c10-8681-11eb-9191-65630f880ca6-gmail-flying-p-white-bg.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/USA-flag-cupcake-150.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/canada-container-150.png",
                  "https://cdn.pacificgroup.net/res/95260e70-7242-11ec-bcdf-3f57d19e6568-pcb-archie-profile-pic-360x360.png"
                  ]

const EMOJIS = ["🙉", "😉", "🥰", "😍", "🤟", "🤓", "😺", "💓", ];   
const EMOJIS2 = ["🤔"];

exports = function (arg){
  const [user, eAdminData] = arg;
  const data = eAdminData.data;
  
  console.log('user hmm: ', user.userTyped )
  
  console.log("from eAdmin Component: ", JSON.stringify(data));
    
  const component = {};
  const cards = [];
  
  if (data === undefined || data.length === 0) {
    console.log('eAdmin no data case..')
    component.text = "Oh, hm...";
    
    cards.push({
        "header": {
        "title": "Archie",
        "subtitle": `E-Admin Result`,
        "imageUrl": IMAGEURL[1],
        "imageStyle": "AVATAR"
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
  else if (data.length >= 1) {

    const collection = data[0];
    
    let URL_ticket = `https://eadmin.pcb.ca/otrs/index.pl?Action=AgentTicketZoom&TicketID=${collection.entityKey}`
    
    console.log('collection.entitykey', typeof collection.entityKey.trim() );
        
    component.text =  `Search result for "${user.userTyped}". ${REPLYCOMMENTS[Math.floor(Math.random()*REPLYCOMMENTS.length)]} ${user.name.split(' ')[0]} ${EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}`;
    
    cards.push({
    "header": {
      "title": "Archie",
      "subtitle": `E-Admin Result`,
      "imageUrl": IMAGEURL[1],
      "imageStyle": "AVATAR"
    },
  
    "sections": [
      {
        "widgets": [
          {
            "buttons": [
              {
                "textButton": {
                  "text": `PCB E-Admin`,
                  "onClick": {
                    "openLink": {
                      "url": "https://eadmin.pcb.ca/"
                    }
                  }
                }
              }
            ]
          },
          {
          "textParagraph": {
              "text": `<b>Title: </b>  <font color=\"#A6192E\">${collection.title} </font>`
            }
          },
                  {
          "textParagraph": {
              "text": `<b>Entity Key: </b>  <font color=\"#A6192E\">${collection.entityKey} </font>`
            }
          },
          {
            "textParagraph": {
              "text": `<b>Created Time: </b>  <font color=\"#A6192E\">${new Date(collection.createdTime).toString()} </font>`
            }
          },
          {
            "textParagraph": {
              "text": `<b>Customer User ID </b>  <font color=\"#A6192E\">${collection.custUserId} </font>`
            }
          },
          
          {
            "textParagraph": {
              "text": `<b>Ticket Number: </b>  <font color=\"#A6192E\">${collection.ticketNum} </font>`
            }
          },
          {
            "keyValue": {
                "topLabel": "<b>E-Admin Ticket</b>",
                "content": `${collection.ticketNum}`,
                "contentMultiline": "false",
                "onClick": {
                    "openLink": {
                        "url": URL_ticket
                    }
                },
                "icon": "DESCRIPTION",
                "button": {
                    "textButton": {
                      "text": "E-Admin Ticket",
                      "onClick": {
                          "openLink": {
                                // "url": `https://eadmin.pcb.ca/otrs/index.pl?Action=AgentTicketZoom;TicketID=${decodeURIComponent(collection.entityKey)}`
                                "url": URL_ticket
                        
                            }
                        }
                      }
                }
            }
        },
  
        ]
      }
    ],
    });

    if (data.length > 1) {
      const collection = data[0];
      const encodedUserTyped = encodeURIComponent(user.userTyped);
      
      const URL_search_result = `https://applications.pacificgroup.net/eadmin/search.cfm?keyword=${user.userTyped}&action=search&engine=as&phrase=1`;      
      const URL_search_result_encoded = `https://applications.pacificgroup.net/eadmin/search.cfm?keyword=${encodedUserTyped}&action=search&engine=as&phrase=1`;
      
      cards.push({
        "sections": [
          {
          "widgets": [
            {
            "textParagraph": {
                "text": `There are still<b>  <font color=\"#A6192E\">${eAdminData.quantityFound - 1}</font> </b>more matches for "${user.userTyped.trim()}"`
              }
            },
            {
              "buttons": [
                {
                  "textButton": {
                    "text": 'See More',
                    "onClick": {
                      "openLink": {
                        "url": URL_search_result_encoded
                      }
                    }
                  }
                }
              ]
            },
            ]
          }
        ]
      });
    }
    
    component.cards = cards;
  }
  
  return component;
};


