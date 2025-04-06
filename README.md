# QuickCV

QuickCV is a web-based application that allows users to create and customize CVs with multiple templates.

## Content

- [Run Instructions](#run)
  - [Backend Setup](#backend)
  - [Frontend Setup](#frontend)

## Angular

## Express.js

## API
### GET
```
/api/user/get_all_users
/api/user/isAdmin
/api/cv/get_all_forms
/api/cv/statistics
```

### POST
```
/api/user/auth
/api/user/register
/api/cv/generate-pdf
/api/cv/get_form
```

### PATCH
```
/api/user/change_password
```

### DELETE
```
/api/user/delete_user
```

## Run


### Backend

To set up and run the backend:

```
cd Backend/api
```

Install dependencies:

```
npm install
```

Install Puppeteer with Chrome:

```
npx puppeteer browsers install chrome
```

Run the backend in watch mode:

```
npm run watch
```

### Frontend

To set up and run the frontend:

```
cd Frontend
```

Install dependencies:

```
npm install
```

Start the Angular development server:

```
ng serve
```

The application should now be running locally! 🎉


## Run using Docker

Install Docker

### Start

```
sudo docker-compose up --build
```

### Stop 

```
sudo docker-compose down -v --remove-orphans
```