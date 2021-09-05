# Pagination Feature Guide

`GET` requests for `/v1/balances`, `/v1/syncs` and `/v1/transactions` routes support pagination feature.

The default body for the following routes is:

**Content Structure** :
```json
{
  "total": "Number",
  "data": []
}

Accepts the following query parameters as a pagination feature, in common:

```
- `page` { Number } - Use `page` to set skip position
- `limit` { Number } - Use `limit` to set limitation

This is the default return structure for paginated results:

**Default Query Parameter** :
```json
{
  "page": 1,
  "limit": 100
}
```

## Examples

### GET limited 5 transactions

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/transactions?limit=5`

**Content Example** :
```json
{
  "total": 5,
  "data": [
    {
      "_id": "60f94c36ec2a3fd24d9e4646",
      "id": "1",
      "amount": 69588,
      "counterpart_name": "Counterpart Name_1",
      "counterpart_iban": "aa2244b7-90b6-42ac-a842-9c4c0a5c009a",
      "date": "2020-09-17T23:30:21.000Z",
      "createdAt": "2021-07-22T10:45:10.308Z"
    },
    {
      "_id": "60f94c36ec2a3fd24d9e464d",
      "id": "2",
      "amount": 69378,
      "counterpart_name": "Counterpart Name_2",
      "counterpart_iban": "38b0b4c8-fd04-4de0-967b-62c189f9a319",
      "date": "2020-09-22T10:20:48.000Z",
      "createdAt": "2021-07-22T10:45:10.908Z"
    },
    {
      "_id": "60f94c37ec2a3fd24d9e4654",
      "id": "3",
      "amount": 6137,
      "counterpart_name": "Counterpart Name_3",
      "counterpart_iban": "3b911928-3b7a-4af3-b485-81b2896eb812",
      "date": "2021-05-06T12:10:59.000Z",
      "createdAt": "2021-07-22T10:45:11.444Z"
    },
    {
      "_id": "60fa8dbe7f92233b2aefb7fe",
      "id": "4",
      "amount": 74135,
      "counterpart_name": "Counterpart Name_4",
      "counterpart_iban": "812a044d-2a88-42b2-bd29-652ab2295a0b",
      "date": "2020-10-07T09:36:43.000Z",
      "createdAt": "2021-07-23T09:37:02.434Z"
    },
    {
      "_id": "60fa8dc17f92233b2aefb805",
      "id": "5",
      "amount": 91023,
      "counterpart_name": "Counterpart Name_5",
      "counterpart_iban": "543691bb-bcbf-417d-8011-713e86fc2a43",
      "date": "2020-09-28T09:44:41.000Z",
      "createdAt": "2021-07-23T09:37:05.244Z"
    }
  ]
}
```

### GET synchronizations one by one

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/syncs?limit=1&page=4`

**Content Example** :
```json
{
  "total": 1,
  "data": [
    {
      "_id": "61261f534966e10fd0e9d8d4",
      "status": "failed",
      "date": "2021-08-25T10:45:39.479Z",
      "createdAt": "2021-08-25T10:45:39.481Z"
    }
  ]
}
```
