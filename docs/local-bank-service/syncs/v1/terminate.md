# Terminate Launched Synchronization

**Method** : `POST`

**URL** : `https://local-bank-service-prod.us-east-1.elasticbeanstalk.com/v1/syncs/terminate`

## Success Response

**Code** : `200 OK`

**Content example** :
```json
{
  "status": "succeed",
  "_id": "6130b240ee5af17f90a95ed8",
  "date": "2021-09-02T11:15:12.914Z",
  "createdAt": "2021-09-02T11:15:12.916Z",
  "updatedAt": "2021-09-02T11:15:18.248Z",
  "__v": 0
}
```

## Failure Responses

**Code** : `400 Bad Request`

**Content** :
```json
{
  "status": "failure",
  "message": "Mongoose error is shown."
}
```

**Code** : `404 Not Found`

**Content** :
```json
{
  "status": "failure",
  "message": "Invalid document ID. PLease, provide valid information!"
}
```
