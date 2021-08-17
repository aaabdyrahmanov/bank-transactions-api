# Query customer balances

**Method** : `POST`

**URL** : `https://tpp-service-prod.us-east-1.elasticbeanstalk.com/api/balances`

**Query parameter** :

```json
// server will return all balances after this date 
{
  "lastDate": ""
}
```

## Success Responses

**Code** : `200 OK`

```json
[
  {
    "amount": 33421,
    "date": "2021-01-05T17:41:52.000Z"
  },
  {
    "amount": 94,
    "date": "2021-01-08T01:33:27.000Z"
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
