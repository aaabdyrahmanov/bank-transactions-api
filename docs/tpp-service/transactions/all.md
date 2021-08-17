# Get all transactions of customers

**Method** : `GET`

**Sample URL** : `https://tpp-service-prod.us-east-1.elasticbeanstalk.com/api/transactions`

## Success Responses

**Code** : `200 OK`

```json
{
  "data": [
    {
      "id": "1",
      "amount": 20314,
      "counterpart_name": "Counterpart Name_1",
      "counterpart_iban": "c5023b9c-f631-4753-a058-d51252b2be06",
      "date": "Thu Dec 17 2020 19:57:15 GMT+0300 (GMT+03:00)"
    },
    {
      "id": "2",
      "amount": 68676,
      "counterpart_name": "Counterpart Name_2",
      "counterpart_iban": "0bf5bd79-646e-402e-9f86-58faa5f950d1",
      "date": "Thu Dec 17 2020 19:57:15 GMT+0300 (GMT+03:00)"   
    },
    ...
  ]
}
```

## Failure Responses

**Code** : `400 Bad Request`
```json
{
  "status": "technicalFailure",
  "message": "The bank failed to return balances"
}
```
