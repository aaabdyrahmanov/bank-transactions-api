# Query customer transactions

**Method** : `POST`

**URL** : `https://tpp-service-prod.us-east-1.elasticbeanstalk.com/api/transactions`

**Query parameter** :

```json
// server will return all transactions after this transaction ID
{
  "lastTransactionId": ""
}
```

## Success Responses

**Code** : `200 OK`

```json
[
  {
    "id": "75",
    "amount": 19997,
    "counterpart_name": "Counterpart Name_75",
    "counterpart_iban": "c5023b9c-f631-4753-a058-d51252b2be06",
    "date": "Thu Dec 17 2020 19:57:15 GMT+0300 (GMT+03:00)"
  },
  {
    "id": "76",
    "amount": 34912,
    "counterpart_name": "Counterpart Name_76",
    "counterpart_iban": "0bf5bd79-646e-402e-9f86-58faa5f950d1",
    "date": "Thu Dec 17 2020 21:13:19 GMT+0300 (GMT+03:00)"   
  },
  {
    "id": "77",
    "amount": 25111,
    "counterpart_name": "Counterpart Name_77",
    "counterpart_iban": "0bf5bd79-646e-402e-9f86-58faa5f950d1",
    "date": "Thu Dec 17 2020 23:10:28 GMT+0300 (GMT+03:00)"   
  },
  ...
]
```

## Failure Responses

**Code** : `400 Bad Request`
```json
{
  "status": "technicalFailure",
  "message": "The bank failed to return balances"
}
```
