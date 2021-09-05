# Clear Redis Cache

**Method** : `DELETE`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/admin/cache`

## Success Response

**Code** : `200 OK`

**Content** :
```json
{
  "status": "success",
  "message": "Data cleared successully!"
}
```

## Failure Response

**Code** : `400 Bad Request`

**Content** :
```json
{
  "status": "failure",
  "message": "Redis error is shown."
}
```
