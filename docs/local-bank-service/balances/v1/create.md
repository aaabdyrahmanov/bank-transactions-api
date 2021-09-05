# Create new balances

**Method** : `POST`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/balances`

## Success Response

**Code** : `201 Created`

**Content example** :
```json
{
  "status": "success",
  "data": [
    {
        "_id": "611b72cee6f30b22238d6375",
        "amount": 924178,
        "date": "2021-10-05T14:48:00.000Z",
        "__v": 0,
        "createdAt": "2021-08-17T08:26:54.895Z",
        "updatedAt": "2021-08-17T08:26:54.895Z"
    },
    {
        "_id": "611b72cee6f30b22238d6376",
        "amount": 401274,
        "date": "2020-01-01T01:00:00.000Z",
        "__v": 0,
        "createdAt": "2021-08-17T08:26:54.895Z",
        "updatedAt": "2021-08-17T08:26:54.895Z"
    },
    ...
  ]

}
```

## Failure Response

**Code** : `400 Bad Request`

**Content** :
```json
{
  "status": "failure",
  "message": "Mongoose error is shown."
}
```
