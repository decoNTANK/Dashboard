# QA Dashboard - API Automation Project

A full-stack QA practice project created to demonstrate API testing, test automation and basic frontend/backend development.

## Project Overview

This project contains a simple Bug Tracking Dashboard application with:

* Frontend interface
* REST API backend
* Postman API test collection
* Newman automated test execution with HTML reporting

The goal of the project is to practice real-world QA workflows:
creating test cases, validating API responses, automating tests and generating reports.

---

## Technologies

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Testing

* Postman
* Newman
* Cypress

### Version Control

* Git
* GitHub

---

## API Endpoints Tested

### Bugs

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | `/api/bugs`     | Get all bugs   |
| GET    | `/api/bugs/:id` | Get bug by ID  |
| POST   | `/api/bugs`     | Create new bug |
| PUT    | `/api/bugs/:id` | Update bug     |
| DELETE | `/api/bugs/:id` | Delete bug     |

---

## Automated API Tests

The Postman collection includes:

### Positive tests

* Verify successful API responses
* Validate response status codes
* Check returned data structure
* Verify created,updated and deleted bug data

### Negative tests

* Requesting non-existing bugs
* Validating error responses
* Checking correct error messages

---

## Newman Test Execution

Run API tests from the Postman folder:

```bash
npx newman run Dashboard.postman_collection.json -e Dashboard.postman_environment.json -r cli,htmlextra
```

The execution generates an HTML test report.

---

## Project Structure

```
Prodzs
│
├── .gitignore
├── README.md
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── postman
│   ├── Dashboard2.postman_collection.json
│   ├── Dashboard2.postman_environment.json
│   └── newman-reports
│       └── report.html

```

---

## Skills Demonstrated

* REST API testing
* HTTP methods (GET, POST, PUT, DELETE)
* Request and response validation
* Postman scripting
* Newman automation
* Test reporting
* Basic web development
* Git workflow
