# Local Bank API Docs

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/16055227/Tzz8tHfL)

## Base URL

`https://local-bank-service-prod.us-east-1.elasticbeanstalk.com`

## Versioning

Each route is individually versioned, for now the only avaliable version is `v1`.

## Pagination

`balances`, `syncs` and `transactions` resources support pagination feature.

See the [pagination](pagination.md) guide for more details and examples.

## Routes

### [Health](health) - Checking the server health

### [Balances](balances) - Detailed info for serialized balances

### [Export](export) - Detailed info for exporting the data as a CSV file

### [Syncs](syncs) - Detailed info on synchronization process

### [Transactions](transactions) - Detailed info for serialized transactions
