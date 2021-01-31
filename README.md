# Scrappy

Scrappy is just another crappy scrapbook with Security 🔐 at its Heart ♥ with one **Master
Passphrase** we provide a great level of security for your scraps. Built with developers and techies
in mind you'll find features you love that you just don't get from notepad.

Every Scraps `Name` & `Content` is Encrypted by default using `AES-256` and `PBKDF2`. This means
everything saved to the disk is behind lock and key.

## 🛋 Couch DB Synchronising

Because we base the app on rxdb, which is backed by pouchdb it's an offline first app, but with
serious connected capabilities.

Configure the database to sync with a couchdb server of your choosing and everything will be backed
up, accessible using your `Master Passphrase`.

## 🌶 Add a touch of pepper

Further to this you can enable the option to integrate with your Operating Systems Keychain to
generate a random pepper for your passphrase. This means the Key used for encrypting your content is
a combination of your passphrase and the pepper preventing keylogging and data lifting attacks.

For those super secret scraps you can optionally wrap them in a separate layer of `AES-256`
encryption locked by a separate password unique to that scrap, again with the option to further
pepper that passphrase locking it to the OS Keychain.

⚠ Using Peppers will require exporting and importing peppers from the OS Keychain to other devices
wanting to read the data.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section
about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

