# Base64 Diff Application
REST Application to find the differences between two sets of base64 encoded data.

[![CI Status](https://circleci.com/gh/maxmousee/compareJS.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/maxmousee/compareJS)

_Author: Natan Facchin_

## Available Endpoints

| Operation |            Path            |                     Description                            |
|-----------|----------------------------|------------------------------------------------------------|
| POST      | \<host>/v1/diff/<id>/left  | Adds or Updates data to Left side of the diff on given ID  |
| POST      | \<host>/v1/diff/<id>/right | Adds or Updates data to Right side of the diff on given ID |
| GET       | \<host>/v1/diff/<id>       | Gets the result of the diff operation for a given ID       |
| GET       | \<host>/v1/<id>            | Gets all the data for a given ID                           |
| DELETE    | \<host>/v1/<id>            | Deletes all the data for a given ID                        |

### Requirements
* Payload must be on JSON format
* Data must be encoded in Base64 

## Deployment
### Prerequisites
* NodeJS 8.11+

### Running Unit Tests
There are 2 unit tests.

To run unit tests:
```
npm test
```

You can find the report at `TODO`.

### Running Integration Tests
There are some integration tests available.

All integration tests are located in file [TODO](.TODO)

To run integration tests:
```
$ npm test
```

### Running Application
This is a NodeJS application, to run it, follow these steps:
#### 1) Run application
```
$ node app.js
```
#### 2) Have fun!
You can access the app at `http://localhost:3000`.

### Examining Logs
TODO

## Examples

### POST to \<host>/v1/diff/\<id>/left
Case: Sending data for the first time with id 1

```
REQUEST
POST /v1/diff/1/left HTTP/1.1
HOST: http://localhost:3000
Content-Type: application/json

{
	"data": "YWxnbG1hIGNvdXphIGFv"
}

```

```
RESPONSE
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": 1,
    "left": "YWxnbG1hIGNvdXphIGFv",
    "right": null,
    "meta": {
        "revision": 0,
        "created": 1525800969837,
        "version": 0
    },
    "$loki": 1
}
```

Case: Sending empty data with id 2

```
REQUEST
POST /v1/diff/2/left HTTP/1.1
HOST: http://localhost:3000
Content-Type: application/json

{
	"data": ""
}

```

```
RESPONSE
HTTP/1.1 400 BAD REQUEST
```

### POST to \<host>/v1/diff/\<id>/right
Case: Updating data with id 3

```
REQUEST
POST /v1/diff/3/right HTTP/1.1
HOST: http://localhost:3000
Content-Type: application/json

{
	"data": "YWxnbG1hIGNvdXssphfIGFv"
}

```

```
RESPONSE
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": 3,
    "left": "YWxnbG1hIGNvdXssphIGFv",
    "right": "YWxnbG1hIGNvdXssphfIGFv",
    "meta": {
        "revision": 2,
        "created": 1525800969837,
        "version": 0,
        "updated": 1525801050508
    },
    "$loki": 3
}
```

### GET to \<host>/v1/diff/\<id>
Case: Get diff with id 4, data is equal

```
REQUEST
GET /v1/diff/4 HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
```

```
RESPONSE
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": 4,
    "equals": true,
    "equalSize": true,
    "differences": []
}
```

Case: Get diff with id 5, data does not have the same size

```
REQUEST
GET /v1/diff/5 HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
```

```
RESPONSE
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": 5,
    "equals": false,
    "equalSize": false,
    "differences": []
}
```

Case: Get diff with id 6, there are differences in the data

```
DATA USED
{
    "id": "6",
    "leftData": "ZGFua29nYWk=",
    "rightData": "ZGEua39nYWk="
}
```

```
REQUEST
GET /v1/diff/6 HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
```

```
RESPONSE
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": 6,
    "equals": false,
    "equalSize": true,
    "differences": [
        {
            "offset": 2,
            "length": 64
        },
        {
            "offset": 4,
            "length": 16
        }
    ]
}
```

```
REQUEST
GET /v1/8 HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
```

```
RESPONSE
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": 8,
    "left": "ZGFua29nYWk=",
    "right": "ZGEua39nYWk=",
    "meta": {
        "revision": 0,
        "created": 1525800896346,
        "version": 0
    },
    "$loki": 8
}
```

## Assumptions
* Data persistence was not required, in-memory storage is being used;
* Differences on the data are being portrayed as which bytes differ from one side of the diff to the other;
* It was not defined how to handle a second POST to the same id on the same side of the diff, so I chose to use a 
different response code for this scenario (200)

## Improvements
* Data persistence could be added to improve reliability;
* The ID could be returned on the error messages for easy tracking;
* It could have more descriptive error messages instead of just returning an HTTP Status with no response content
* Implement logs
* Create a mechanism to inform the user in a more explicit way which version of each side of the diff is being used
for a given GET diff operation.

## Support
If you have any question, please send an [email](mailto:maxmousee@gmail.com).
