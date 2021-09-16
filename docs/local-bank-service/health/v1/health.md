# Check Server Health

**Method** : `GET`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/health`

## Success Response

**Code** : `200 OK`

**Content example** :
```json
{
  "uptime": 13.396144666,
  "message": "OK",
  "timestamp": 1630577161176
}
```

## Failure Response

**Code** : `503 Service Unavailable`
