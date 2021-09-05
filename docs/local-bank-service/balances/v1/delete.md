# Delete all balances

**Method** : `DELETE`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/balances`

## Success Response

**Code** : `200 OK`

**Content example** :
```json
{
  "status": "success",
  "message": "Totally 36 data was removed!"
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
