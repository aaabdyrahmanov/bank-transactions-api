# Get all launched synchronizations

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/syncs`

## Success Response

**Code** : `200 OK`

**Content example** :
```json
{
  "total": 28,
  "data": [
    {
        "_id": "612b552dacbf77c112602475",
        "status": "succeed",
        "date": "2021-08-29T09:36:45.688Z",
        "createdAt": "2021-08-29T09:36:45.702Z"
    },
    {
        "_id": "612b69e4acbf77c11260247d",
        "status": "pending",
        "date": "2021-08-29T11:05:08.872Z",
        "createdAt": "2021-08-29T11:05:08.881Z"
    },
    ...
  ]
}
```

## Failure Responses

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": "failure",
  "message": "Mongoose error is shown."
}
```

**Code** : `404 Not Found`

**Content** :
```json
{
  "status": "failure",
  "message": "Sorry, it looks like storage is empty. Data not found!"
}
```
