import gapi from "gapi-client";

// Client ID and API key from the Developer Console
const CLIENT_ID =
  "1089187144411-jr3r968nfoph1upd64qv9d59jam0dpsj.apps.googleusercontent.com";
const API_KEY = "AIzaSyBLKN2Ipmh2FUJ78mNQDQ3vyhZRU8snb8Q";

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

/**
 *  On load, called to load the auth2 library and API client library.
 */
export const handleClientLoad = callback => {
  gapi.load("client:auth2", () => {
    initClient(callback);
  });
};

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
const initClient = callback => {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(res => {
        callback({ isSignedIn: res });
      });

      // Handle the initial sign-in state.
      callback({ isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get() });
    });
};

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
// export const updateSigninStatus = isSignedIn => {
//   if (isSignedIn) {
//     console.log("サインインした！");
//     // authorizeButton.style.display = "none";
//     // signoutButton.style.display = "block";
//     listUpcomingEvents();
//   } else {
//     // authorizeButton.style.display = "block";
//     // signoutButton.style.display = "none";
//   }
// };

/**
 *  Sign in the user upon button click.
 */
export const handleAuthClick = event => {
  gapi.auth2
    .getAuthInstance()
    .signIn()
    .catch(err => console.log("auth,", err))
    .then(res => console.log("auth.", res));
};

/**
 *  Sign out the user upon button click.
 */
export const handleSignoutClick = event => {
  gapi.auth2.getAuthInstance().signOut();
};

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
const appendPre = message => {
  const pre = document.getElementById("content");
  const textContent = document.createTextNode(message + "\n");
  pre.appendChild(textContent);
};

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
export const listUpcomingEvents = async () => {
  return gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    })
    .then(res => {
      const events = res.result.items;

      if (events.length > 0) {
        const eventTimes = [];
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          let startDateTime = new Date(event.start.dateTime);
          let endDateTime = new Date(event.end.dateTime);
          if (event.start.dateTime) {
            let month, day, hour, min;
            month = startDateTime.getMonth() + 1;
            day = startDateTime.getDate();
            hour = startDateTime.getHours();
            min = startDateTime.getMinutes();
            startDateTime = `${month}/${day} ${hour}:${min}`;
            month = endDateTime.getMonth() + 1;
            day = endDateTime.getDate();
            hour = endDateTime.getHours();
            min = endDateTime.getMinutes();
            endDateTime = `${month}/${day} ${hour}:${min}`;
            appendPre(
              event.summary + " ( " + startDateTime + " ~ " + endDateTime + " )"
            );
            eventTimes.push({
              start: new Date(event.start.dateTime),
              end: new Date(event.end.dateTime)
            });
          }
        }
        return eventTimes;
      } else {
        appendPre("No upcoming events found.");
        return [];
      }
    });
};
