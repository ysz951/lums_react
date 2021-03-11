# LUMS
An online license and user management system based on React and SpringBoot.

This is the front end for `LUMS`. The front end can be found at https://github.com/ysz951/lums.

## Features
* Security login based on JWT Authentication with auto logout client side.
* Dynamic web page change based on user's role.
* RESTful API services authorization implemented by Spring Boot.
* Data validation on both client-side and server-side.
* Provided with several templates to send email more conveniently.
* Displayed the action logs in real time.

## Demo
* [Live Demo](https://lums-react.vercel.app/)

### Demo user automatically log in
* Click `Demo user login` button on `login` page.

### Demo credentials 
* `User name`: `lums@admin.com`
* `Password`: `admin123`

## Screenshoots
### Home page: 
![image](https://github.com/ysz951/lums/blob/master/demo_images/main_page.jpg)

## Setting Up

- Install dependencies: `npm install`
- create a `.env` file under the root folder and include the parameters:
```
REACT_APP_EMAIL_SERVICE_ID=You_EmailJS_ServiceID
REACT_APP_EMAIL_USER_ID=You_EmailJS_UserID
REACT_APP_EMAIL_TEMPLATE_ID=You_EmailJS_TemplateID
REACT_APP_API_URL=YourAPIUrl
REACT_APP_DEMO_PASSWORD=YourPassword
```

## Scripts

- Install dependencies: `npm install`
- Run tests: `npm test`
- Build application: `npm build`

