IMAGES = [
  "https://https://pcbcrm.pacificgroup.net/userpics/389/Mr.%20Ad%20Min1.png", // admin
  "https://cdn.pacificgroup.net/res/cc1c6c10-8681-11eb-9191-65630f880ca6-gmail-flying-p-white-bg.jpg", // main 
  "https://cdn.pacificgroup.net/res/95260e70-7242-11ec-bcdf-3f57d19e6568-pcb-archie-profile-pic-360x360.png" //archie
];

exports = function(arg){
  
  const [ userData, textMessage ] = arg

  return {
    
 
    "text": `${textMessage}`,
    "cards": [{
      "header": {
        "title": "Archie-Test2",
        "subtitle": `Canada/US Shipment & Freight & E-Admin `,
        "imageUrl": IMAGES[2],
        "imageStyle": "AVATAR"
      },
      "sections": [{
        "widgets": [
         {
          "textParagraph": {
              "text": `<b>How to use: </b><br>- Simply type "<b><font > / </font></b>"<br>- Select your choice<br>- Type your keyword after<br>- Enter 👍`
            }
          },
          {
          "textParagraph": {
              "text": `<b>Example: </b><br>  <font color=\"#1A73E8\" size=\"20px\">/PAPS</font> B00480730`
            }
          },
          {
          "textParagraph": {
              "text": `<b>Tip: </b> <br> Add me either in your team <b><font color=\"#42AD46\">Spaces</font></b> or <b><font color=\"#42AD46\">1:1 chat</font></b> as well`
            }
          },
        {
          "textParagraph": { "text": `<b>Quick Links: </b> <br>` }
        },
        {
          "buttons": [
            {
            "textButton": {
              "text": "PCB CA",
              "onClick": {
                "openLink": {
                  "url": "https://pcb.ca"
                  }
                }
              }
            },
            {
            "textButton": {
              "text": "PCB USA",
              "onClick": {
                "openLink": {
                  "url": "https://pcbusa.com/"
                  }
                }
              }
            },
            {
            "textButton": {
              "text": "Freight",
              "onClick": {
                "openLink": {
                  "url": "https://pcbfreight.com/"
                  }
                }
              }
            },
           {
            "textButton": {
              "text": "e-Admin",
              "onClick": {
                "openLink": {
                  "url": "https://applications.pacificgroup.net/eadmin/search.cfm?backtoeadmin=1"
                  }
                }
              }
            },
            
          ]
        }
      ]}]
    }],
  };
};
  //   {
  // "sections": [
  //   {
  //     "widgets": [
  //       {
  //         "textInput": {
  //           "label": "search ",
  //           "type": "SINGLE_LINE",
  //           "name": "superSearch",
  //           "hintText": "search your shipment status/eAdmin",
  //           "value": "",
  //           "multipleSuggestions": false
  //         },
  //         "horizontalAlignment": "CENTER"
  //       },
  //       {
  //         "buttonList": {
  //           "buttons": []
  //         },
  //         "horizontalAlignment": "CENTER"
  //       }
  //     ]
  //   }
//   ]
// }
