# cq-metrics-server

requires [node.js](http://nodejs.org) 0.8+

## installation

    $ npm install civicquarterly/cq-metrics-server
    $ npm start

## env variables

- *PORT* http port it listens on, e.g. 9000
- *GA_CLIENT_ID*
- *GA_CLIENT_SECRET*
- *GA_ACCESS_TOKEN* - for a user with access to the Google Analytics profile
- *GA_REFRESH_TOKEN* - for a user with access to the Google Analytics profile
- *GA_PROFILE_ID* - the profile id, e.g. "ga:123432"
- *STRIPE_KEY* - key with read access to the stripe account

## api

CORS is enabled for all GET endpoints

### `GET /metrics.json`

sample response:
```json
{
  monthlyUniques: 100000
}
```


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
