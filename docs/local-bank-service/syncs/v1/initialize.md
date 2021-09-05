# Initialize a new synchronization

**Method** : `POST`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/syncs/init`

## Success Response

**Code** : `201 Created`

**Content example** :
```json
{
  "status": "success",
  "data": {
    "status": "pending",
    "_id": "612620a2b26d421782241f8e",
    "date": "2021-08-25T10:51:14.187Z",
    "createdAt": "2021-08-25T10:51:14.188Z",
    "updatedAt": "2021-08-25T10:51:14.188Z",
    "__v": 0
  }
}
```

## Failure Responses

**Code** : `400 Bad Request`
```json
{
  "status": "failure",
  "message": "Mongoose OR AMQP error is shown."
}
```
