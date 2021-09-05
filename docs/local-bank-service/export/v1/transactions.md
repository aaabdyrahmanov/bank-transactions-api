# Export all transactions in a CSV file

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/export/transactions`

## Success Response

**Code** : `200 OK`

**Content-Type** `text/csv; charset=utf-8`

**Content example** :
```
"TransactionId","Amount","Counterpart Name","Counterpart IBAN","Execution Date","Created Date"
"587eb86f-7a08-4ef6-ae75-704199db5ee4",51314,"MandatoryUpdate","86651def-d38a-4d7d-a444-9016f5fed846","12:05:20 PM, 17th Sep 2020 (UTC +00:00)","9:36:47 AM, 29th Aug 2021 (UTC +00:00)"
```

## Failure Response

**Code** : `400 Bad Request`

**Content-Type** `application/json; charset=utf-8`

**Content** :
```json
{
  "status": "failure",
  "message": "Sorry, it looks like storage is empty. Data not found!"
}
```
