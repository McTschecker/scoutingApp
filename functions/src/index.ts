import * as functions from "firebase-functions";
import * as request from "request-promise-native";
import { google } from "googleapis";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const CONFIG_CLIENT_ID = functions.config().googleapi.client_id;
const CONFIG_CLIENT_SECRET = functions.config().googleapi.client_secret;
const functionsOauthClient = new google.auth.OAuth2(
  CONFIG_CLIENT_ID,
  CONFIG_CLIENT_SECRET,
  "https://***************.firebaseapp.com/oauthcallback"
);
let event = "postSeasonTesting";
// import * as OAuth2Client from "google-auth-library";

function makeDataReady(red: any, blue: any, matchNumber: Number) {
  //Formats for database
  return {
    matchNumber: Number(matchNumber),
    event: event,
    blueTeam: {
      team1: {
        number: blue[0],
        taken: false
      },
      team2: {
        number: blue[1],
        taken: false
      },
      team3: {
        number: blue[2],
        taken: false
      }
    },
    redTeam: {
      team1: {
        number: red[0],
        taken: false
      },
      team2: {
        number: red[1],
        taken: false
      },
      team3: {
        number: red[2],
        taken: false
      }
    }
  };
}

export const getTeamsOfMatch = functions.https.onCall(async (data, context) => {
  try {
    console.log("New version 1.5");

    let eventKey = "2019gal"
    //Constructs Request Url
    const url =
      "https://www.thebluealliance.com/api/v3/match/" + //Base URL
      eventKey + "_qm" + //current event + _qm (qm is for qualification match)
      Number(data.matchNumber) +
      "/simple"; //For docs go to https://www.thebluealliance.com/apidocs/v3
    //Do the request
    const options = {
      url: url,
      gzip: true,
      json: true,
      headers: {
        "X-TBA-Auth-Key":
          "*****"
      }
    };
    const parsed = await request(options);
    // console.log(parsed);
    let returnS = makeDataReady(
      parsed.alliances.red.team_keys,
      parsed.alliances.blue.team_keys,
      data.matchNumber
    );
    // console.log(retrurnS);
    return returnS;
  } catch (err) {
    throw new Error(err);
  }
});

export const syncWithSpreadsheet = functions.firestore
  .document("matches/{match}")
  .onCreate(async (snap: any, context: any) => {
    let data = snap.data();
    return appendPromise({
      spreadsheetId: "***********************",
      range: "'Raw Data'!A2:V",
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[
          data.team,
          data.matchNumber,
          data.startingLevel,
          formatTrueFalse(data.wasPresent),
          data.crossedAuto,
          data.climbLevel,
          formatTrueFalse(data.brokenOrFall),

          data.cargoShipCargo,
          data.cargoShipHP,

          data.rocketCargo,
          data.rocketHP,

          data.rocket1LvlCargo,
          data.rocket1LvlHP,

          data.rocket2LvlCargo,
          data.rocket2LvlHP,

          data.rocket3LvlCargo,
          data.rocket3LvlHP,

          //	data.autonomous,
          //	data.teleop,
          formatTrueFalse(data.defended),
          formatTrueFalse(data.defenseBot),
          data.droppedCargo,
          data.droppedHP,
          data.comment,
          data.userID,
          data.userName,
        ]],
      },
    });
  });

// accepts an append request, returns a Promise to append it, enriching it with auth
function appendPromise(requestWithoutAuth: any) {
  return getAuthorizedClient().then((client) => {
    const sheets = google.sheets('v4');
    const change = requestWithoutAuth;
    change.auth = client;
    return sheets.spreadsheets.values.append(change, (err: any, response: any) => {
      if (err) {
        console.log(`The API returned an error: ${err}`);
        throw new Error(err);
      }
      return (response.data);
    });
  });
}

// checks if oauthTokens have been loaded into memory, and if not, retrieves them
function getAuthorizedClient() {
  return admin.database().ref("api_tokens/").once('value').then((snapshot) => {
    let oauthTokens = snapshot.val();
    functionsOauthClient.setCredentials(oauthTokens);
    return functionsOauthClient;
  });
}

function formatTrueFalse(bool: boolean) {
  if (bool) {
    return "TRUE"
  } else { return "FALSE" }
}


/*
* Returns climb level,
cargoship,
rocket,
HP
and Cargo placement in an json like object
*/
async function getCurrentTotal(teamNumber:Number){
  var totals = {
    climbTotal: 0,
    cargoshipTotal: 0,
    rocketTotal: 0,
    HPTotal: 0,
    cargoTotal: 0,
    matchesTotal: 0
  }
  var ref = db.collection("events").doc(event).collection("teams").doc(String(teamNumber));
  const snapshot = await ref.get()
  if (!snapshot.exists){
    console.log("no total existing for client");
  }else{
    const data = snapshot.data()
    // console.log(" rocketTotal:" + data.rocketTotal);
    totals.climbTotal = data.climbTotal;
    totals.cargoshipTotal = data.cargoshipTotal;
    totals.rocketTotal = data.rocketTotal
    totals.HPTotal = data.HPTotal
    totals.cargoTotal = data.cargoTotal
    totals.matchesTotal = data.matchesTotal
  }
  return totals
}
function computeAverages(totals:any, team:number){ //gets the totals
  var averages = {
    climb: 0.0,
    cargoship:0.0,
    rocket: 0.0,
    HP: 0.0,
    cargo: 0.0,
    matches: 0,
    teamNumber: team
  }
  averages.matches = totals.matchesTotal;
  // console.log("number of matches: " + averages.matches)
  averages.climb = totals.climbTotal / averages.matches
  averages.cargoship = totals.cargoshipTotal / averages.matches
  averages.rocket = totals.rocketTotal / averages.matches
  averages.HP = totals.HPTotal / averages.matches
  averages.cargo = totals.cargoTotal / averages.matches
  // console.log("rocket: " + averages.rocket)
  return(averages)
}
export const updateAverages = functions.firestore
.document("matches/{match}")
.onCreate(async (snap: any, context: any) => {
  var newSubmission = snap.data()
  var totals = await getCurrentTotal(newSubmission.team);
  console.log("in function" + totals);
  //updating values
  totals.climbTotal = totals.climbTotal + newSubmission.climbLevel
  totals.cargoshipTotal = totals.cargoshipTotal + newSubmission.cargoShipCargo + newSubmission.cargoShipHP
  totals.rocketTotal = totals.rocketTotal + newSubmission.rocketCargo + newSubmission.rocketHP
  totals.HPTotal = totals.HPTotal + newSubmission.cargoShipHP + newSubmission.rocketHP
  totals.cargoTotal = totals.cargoTotal + newSubmission.cargoShipCargo + newSubmission.rocketCargo
  // console.log("old total matches", totals.matchesTotal);
  totals.matchesTotal = totals.matchesTotal + 1;
  // console.log("new total matches" + totals.matchesTotal);
  var ref = db.collection("events").doc(event).collection("teams").doc(String(newSubmission.team));
  //pushes changes
  await ref.set(totals);
  var averages = db.collection("events").doc(event).collection("averages").doc(String(newSubmission.team));
  await averages.set(computeAverages(totals, newSubmission.team));

});
