const REPLYCOMMENTS = ["Here is the result", "On your command!", "One day at a time..", "Keep Calm and carry on", "Everything will be Alright!", "When are we having coffee?"];
const IMAGEURL = ["https://cdn.pacificgroup.net/res/6e4ad500-1b00-11eb-a920-8125b1a2392f-smgi-ship-clr-1200px.png",
                  "https://cdn.pacificgroup.net/res/cc1c6c10-8681-11eb-9191-65630f880ca6-gmail-flying-p-white-bg.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/USA-flag-cupcake-150.jpg",
                  "https://cdn9.pacificgroup.net/i/stk/canada-container-150.png",
                  "https://cdn.pacificgroup.net/res/95260e70-7242-11ec-bcdf-3f57d19e6568-pcb-archie-profile-pic-360x360.png"
                  ]

const EMOJIS = ["🙉", "😉", "🥰", "😍", "🤟", "🤓", "😺", "💓", ];   
const EMOJIS2 = ["🤔"];

exports = function ({spaceDM, from, message}){
  const component = {};
  const cards = [];
    cards.push({
    "header": {
      "title": "Archie",
      "subtitle": `Test Sent from ${from}`,
      "imageUrl": IMAGEURL[0],
      "imageStyle": "AVATAR"
    },
    "sections": [
      {
        "widgets": [
          {
          "textParagraph": {
              "text": `<b>Message Test to: </b>  <font color=\"#A6192E\">${spaceDM} </font>`
            }
          },
          {
          "textParagraph": {
              "text": `<b>Message: </b>  <font color=\"#A6192E\">${message} </font>`
            }
          },
          {
          "textParagraph": {
              "text": `<b>Sent from: </b>  <font color=\"#A6192E\"> <b>${from}</b></font>`
            }
          },
        ]
      }
    ],
    });
    component.cards = cards;
    component.text= "Test: by IT team ";
  return component;
};


