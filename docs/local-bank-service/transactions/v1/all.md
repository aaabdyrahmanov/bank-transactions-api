# Get all transactions

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/transactions`

## Success Response

**Code** : `200 OK`

**Content example** :
```json
{
  "total": 5,
  "data": [
    {
      "_id": "613453647d05e9d789573f3d",
      "id": "7",
      "amount": 28822,
      "counterpart_name": "Counterpart Name_7",
      "counterpart_iban": "f3effe2a-a4a6-4d16-9896-c6d88ff11beb",
      "date": "2020-10-06T17:43:57.000Z",
      "createdAt": "2021-09-05T05:19:32.833Z"
    },
    {
      "_id": "613453647d05e9d789573f3e",
      "id": "8",
      "amount": 76669,
      "counterpart_name": "Counterpart Name_8",
      "counterpart_iban": "897332ec-39ce-40a8-b210-a77da0407e69",
      "date": "2021-07-16T17:48:28.000Z",
      "createdAt": "2021-09-05T05:19:32.833Z"
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
