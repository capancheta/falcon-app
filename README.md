![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)![Microsoft Teams](https://img.shields.io/badge/Microsoft_Teams-0078D4.svg?style=for-the-badge&color=6264A7&logo=Microsoft%20Teams&logoColor=white)

# Falcon Console

A simple react app utilizing a firebase backend. Meant to be run inside MS Teams.

### Development

-   edit the .env or create your own .env.local
-   **bring your own firebase instance!**
-   create a collection, document, key, set to boolean.
-   set all these values in your .env

to start the dev environment:

```bash
npm run start
```

it'll be on https://localhost:3000. Teams will only accept apps served through https (even if there is no certificate)

### Build and deploy

Build

```bash
npm run build --prod
```

Hookup to firebase. Select Hosting

```bash
firebase login
firebase init
```

Deploy

```bash
firebase deploy
```

Currently deployed at https://testtype-73020.firebaseapp.com/

### Azure AD

1. Navigate to https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
2. Register an application:
    - name
    - account type: single tenant (for now)
    - redirect uri: spa, `https://<domain-name>` (for local dev, you can enter localhost:3000)
    - take note of the application id (aka client-id)
3. Edit the application:
    - API Permissions
        - Add a permission:
            - Microsoft Graph - Delegated Perissions
                - email
                - offline_access
                - openid
                - profile
    - Grant admin consent
4. Expose an API
    - edit the value: `api://<domain-name>/<client-id>`
    - add scope
        - Scope name: access_as_user
        - Who can consent? Admins and Users
        - Admin consent display name: Teams can access app’s web APIs
        - Admin consent description: Allows Teams to call the app’s web APIs as the current user.
        - User consent display name: Teams can access app’s web APIs and make requests on your behalf
        - User consent description: Enable Teams to call this app’s web APIs with the same rights that you have
        - State: Enabled
    - add a Client Application (tick authorized scopes)
        - 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 (MS Teams client)
        - 1fec8e78-bce4-4aaf-ab1b-5451cc387264 (MS Teams web client)

### MS Teams

1. Navigate to https://dev.teams.microsoft.com/apps
2. Add a new app, give it a name
3. Configure basic information
    - Fill up all required fields. websites must be in https://
    - Application (Client ID): set to `client-id`
    - Save.
4. App Features
    - Personal App
        - give the tab a name
        - Set content url to `https://<domain-name>/<landing-route>` (landing route is where you utilize the teams context. in this project it is utilized in the root, so you may just put https://localhost:3000)
    - Save.
5. Single Sign On
    - set to `api://<domain-name>/<client-id>`
6. Preview in Teams. If all goes well, the app will render inside the teams web client.

## Notes

-   You may edit the domain name freely. Just make sure you change it in all 4 config sections previously mentioned.
-   Azure AD:
    -   You may edit authorization - supported account types to multitenant.
    -   TODO: Add custom domains
-   MS Teams:
    -   Do not enable the loading indicator.
