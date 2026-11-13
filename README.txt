RACK-O: files and setup
=======================

Files
- index.html            The game.
- sw.js                 Makes the game work offline. Change VERSION at the top
                        whenever you update any file, so phones get the update.
- manifest.webmanifest  App name, colors and icons for installing on phones.
- icons/                App icons.
- firebase-config.js    Your Firebase settings for online play (see below).
- database.rules.json   Security rules to paste into Firebase (see below).

Publishing on GitHub Pages
1. In your repository, click Add file > Upload files.
2. Drag in the files you changed (not the folder), then click Commit changes.
3. Wait for the green check in the Actions tab.

Pass and play works right away. Online play needs a free Firebase project,
which takes about 15 minutes to set up once.

Setting up online play (Firebase)
1. Go to https://console.firebase.google.com and sign in with a Google account.
2. Create a new project (any name, such as rack-o). You can turn off
   Google Analytics; the game doesn't use it.
3. Turn on anonymous sign-in: Build > Authentication > Get started >
   Sign-in method > Anonymous > Enable > Save. Players never create accounts;
   each device just gets a random ID.
4. Create the database: Build > Realtime Database > Create database. Pick a
   location near you and choose "Start in locked mode."
5. Open the Rules tab of the Realtime Database, replace everything there with
   the contents of database.rules.json, and click Publish.
6. Register the game: open Project settings (the gear icon), scroll to
   "Your apps," click the web icon (</>), give it a nickname, and click
   Register app. Firebase shows a block of code with "firebaseConfig".
7. Open firebase-config.js in a text editor and replace the values between
   the { } with the ones Firebase showed you. Make sure databaseURL is filled
   in. If it isn't, copy the address shown at the top of the Realtime Database
   page (it ends in firebasedatabase.app or firebaseio.com).
8. Upload firebase-config.js to GitHub with your other changes.

The apiKey in firebase-config.js is not a password. Firebase web settings are
meant to be public; the security rules are what protect the database.

Playing online
- One person chooses New game > Online, types a name, and taps Create a room.
- Everyone else chooses Online, types a name and the 4-letter room code, and
  taps Join.
- The host can add computer players, then taps Start the game.
- The host's device runs the game, so the host should keep the game open.
  If a player loses connection, the host can let the computer play for them.
