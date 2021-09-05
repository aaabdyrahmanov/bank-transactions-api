# Export all balances in a CSV file

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/export/balances`

## Success Response

**Code** : `200 OK`

**Content-Type** `text/csv; charset=utf-8`

**Content example** :
```
"BalanceId","Amount","Execution Date","Created Date"
"612b552facbf77c112602479",26148,"14:48:00 PM, 5th Oct 2019 (UTC +00:00)","9:36:47 AM, 29th Aug 2021 (UTC +00:00)"
"612b552facbf77c11260247a",41589,"14:48:00 PM, 5th Oct 2021 (UTC +00:00)","9:36:47 AM, 29th Aug 2021 (UTC +00:00)"
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
