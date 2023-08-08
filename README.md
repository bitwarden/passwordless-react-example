# Backend
## Signup
Request
```json
POST /signup

{
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "deviceName": "string"
}
```

```json
{"username":"bitwardenjonas","firstName":"Jonas","lastName":"Hendrickx","deviceName":"macven"}
```

Response
```json
{"token":"string"}
```

```json
{
    "token": "register_k8QgsL93tVqRKJfb8b2SiZLBzEb4NPLpLzYHt7I-cFbf8A3Ei9wAE9f_SqW9wGTSS5bZJDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMMDAwMDAwMDA2SQ1OTY5NmU1NS01ZWEzLTQ5NzgtOTExZS03NDAyZTAyYThhN2XArmJpdHdhcmRlbmpvbmFzpE5vbmXAw6lQcmVmZXJyZWSRpm1hY3ZlbsPOeHVcDw"
}
```

## Sign in
Request
```
GET /signin?token=verify_xxx
```

```
GET /signin?token=verify_k8QgFoqG-yjEr0Kz4LDOjutPnAY7_yXKHWYFSuIJlWfr08zE6NwAE9f_QTTfAGTSTR3ZJDNlZmFjOWRhLTNiZTktNDJjNi05YWJkLTcyMzIxZTFmZDkwMK5wYXNza2V5X3NpZ25pbsDAwMDAwMDZJDU5Njk2ZTU1LTVlYTMtNDk3OC05MTFlLTc0MDJlMDJhOGE3Zdf_QTSwIGTSTKWpbG9jYWxob3N0tWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMMOzQ2hyb21lLCBNYWMgT1MgWCAxMKCmbWFjdmVuxDAGJ_src8cEWarNaMyWCFaTQ2I3bfUVmnf1J-_atUKpDk647a0S6I0OGZyPAdB9Cr3OeHVcDw
```

Response
```json
{
    "jwt": "string",
    "webAuthn": {
        "userId": "string",
        "credentialId": "string",
        "success": true,
        "timestamp": "2023-08-08T14:09:41.273493Z",
        "rpId": "string",
        "origin": "http://localhost:3000",
        "device": "string",
        "country": "",
        "nickname": "string",
        "expiresAt": "2023-08-08T14:11:41.273496Z",
        "type": "string"
    }
}
```

```json
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIlVzZXIiLCJBZG1pbiJdLCJuYW1laWQiOiI1OTY5NmU1NS01ZWEzLTQ5NzgtOTExZS03NDAyZTAyYThhN2UiLCJuYmYiOjE2OTE1MDUzNDMsImV4cCI6MTY5MjExMDE0MywiaWF0IjoxNjkxNTA1MzQzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMTMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.yFByxlI7H9EMedfkNPYk0oheXl7j12fJiH1f8EqoiBY",
    "webAuthn": {
        "userId": "59696e55-5ea3-4978-911e-7402e02a8a7e",
        "credentialId": "Bif7K3PHBFmqzWjMlghWk0NiN231FZp39Sfv2rVCqQ5OuO2tEuiNDhmcjwHQfQq9",
        "success": true,
        "timestamp": "2023-08-08T14:35:43.703799Z",
        "rpId": "localhost",
        "origin": "http://localhost:3000",
        "device": "Chrome, Mac OS X 10",
        "country": "",
        "nickname": "macven",
        "expiresAt": "2023-08-08T14:37:43.703799Z",
        "type": "passkey_signin"
    }
}
```

The JWT token, when decoded, will look like:
```json
{
  "role": [
    "User",
    "Admin"
  ],
  "nameid": "59696e55-5ea3-4978-911e-7402e02a8a7e",
  "nbf": 1691505343,
  "exp": 1692110143,
  "iat": 1691505343,
  "iss": "http://localhost:5013",
  "aud": "http://localhost:3000"
}
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
