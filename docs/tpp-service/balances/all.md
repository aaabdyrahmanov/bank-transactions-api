# Get all balances of customers

**Method** : `GET`

**URL** : `https://tpp-service-prod.us-east-1.elasticbeanstalk.com/api/balances`

## Success Responses

**Code** : `200 OK`

```json
{
  "data": [
    {
        "amount": 26148,
        "date": "2019-10-05T14:48:00.000Z"
    },
    {
        "amount": 41589,
        "date": "2019-11-08T10:55:00.000Z"
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
