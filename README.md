# Aucklnd Transport Developer Portal API

Messing about with the [Auckland Transport Developer Portal
API](https://dev-portal.at.govt.nz).

## Install

- Register an account at <https://dev-portal.at.govt.nz>
- Subscribe to the public transport dev product and get an API key
- Download realtime data:
  ```shell
  % APTD_PRIMARY_KEY=... node bin/realtime.js > viewer/src/data/out.csv
  ```
- You'll need a mapbox access token from <https://mapbox.com>
- Setup and run the Observable Framework application:
  ```shell
  % cd viewer
  % npm install
  % MAPBOX_ACCESS_TOKEN=... npm run dev
  ```
