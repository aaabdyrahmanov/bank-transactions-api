# Get all balances

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/balances`

## Success Response

**Code** : `200 OK`

**Content example** :
```json
{
  "total": 12,
  "data": [
    {
        "amount": 26148,
        "date": "2019-10-05T14:48:00.000Z"
    },
    {
        "amount": 41589,
        "date": "2021-10-05T14:48:00.000Z"
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
