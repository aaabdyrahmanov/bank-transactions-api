# Create new transactions

**Method** : `POST`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/transactions`

## Success Response

**Code** : `201 Created`

**Content example** :
```json
{
  "status": "success",
  "data": [
    {
        "_id": "611b7393e6f30b22238d637a",
        "id": "7",
        "amount": 28822,
        "counterpart_name": "Counterpart Name_7",
        "counterpart_iban": "f3effe2a-a4a6-4d16-9896-c6d88ff11beb",
        "date": "2020-10-06T17:43:57.000Z",
        "__v": 0,
        "createdAt": "2021-08-17T08:30:11.445Z",
        "updatedAt": "2021-08-17T08:30:11.445Z"
    },
    {
        "_id": "611b7393e6f30b22238d637b",
        "id": "8",
        "amount": 76669,
        "counterpart_name": "Counterpart Name_8",
        "counterpart_iban": "897332ec-39ce-40a8-b210-a77da0407e69",
        "date": "2021-07-16T17:48:28.000Z",
        "__v": 0,
        "createdAt": "2021-08-17T08:30:11.446Z",
        "updatedAt": "2021-08-17T08:30:11.446Z"
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
