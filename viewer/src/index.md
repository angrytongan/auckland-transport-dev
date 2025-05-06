---
title: Auckland Transport realtime viewer
toc: false
---

```js
import deck from "npm:deck.gl";

const data = FileAttachment("./data/out.csv").csv({ typed: true });
```

```js
const initialViewState = {
  longitude: 174.7645,
  latitude: -36.8509,
  zoom: 9,
};

const red = [ 255, 0, 0, 255 ];
const green = [ 0, 255, 0, 255 ];
const transparent = [ 255, 255, 255, 0 ];

const alpha = (col, al) => [ col[0], col[1], col[2], al ];

const calcTargetPosition = (lat, lng, bearing, distance) => {
  const earthRadius = 6371000; // in meters
  const latRad = lat * Math.PI / 180;
  const lngRad = lng * Math.PI / 180;
  const bearingRad = bearing * Math.PI / 180;
  const angularDistance = distance / earthRadius;

  const newLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(angularDistance) +
    Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearingRad)
  );

  const newLngRad = lngRad + Math.atan2(
    Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(latRad),
    Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(newLatRad)
  );

  return [
    newLngRad * 180 / Math.PI,
    newLatRad * 180 / Math.PI,
  ];
};

const deckInstance = new deck.DeckGL({
  mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
  mapStyle: 'mapbox://styles/mapbox/dark-v11',
  container,
  initialViewState,
  controller: true,

  layers: [
    new deck.ScatterplotLayer({
      data: data,
      getPosition: (d) => [d.lng, d.lat],
      getFillColor: (d) => d.vehicle_plate ? (d.speed > 0 ? green : red) : transparent,
      getLineColor: (d) => d.speed > 0 ? green : red,

      stroked: true,

      radiusMinPixels: 3,
    }),

    new deck.LineLayer({
      data: data.filter((d) => d.bearing),
      getSourcePosition: (d) => [d.lng, d.lat],
      getTargetPosition: (d) => calcTargetPosition(d.lat, d.lng, d.bearing, 150),
      getColor: (d) => alpha(d.speed ? green : red, 128),

      widthMinPixels: 3,
    }),

    new deck.TextLayer({
      data: data.filter((d) => d.vehicle_label || d.vehicle_plate),
      getPosition: (d) => [d.lng, d.lat],
      getText: (d) => [
        d.vehicle_label,
        d.vehicle_plate,
      ].join('\n'),
      getColor: (d) => alpha(d.speed ? green : red, 128),
      getPixelOffset: [22, 8],

      sizeMaxPixels: 8,
    }),
  ]
});

invalidation.then(() => {
  deckInstance.finalize();
  container.innerHTML = "";
});
```

<script src="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js"></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet" />
<!-- Allow the map to render in full screen  -->

<div class="card">
  <figure style="max-width: none; position: relative;">
  <div id="container"></div>
</figure>
</div>

<div class="card">
  ${Inputs.table(data)}
</div>

<style>
  #container {
    overflow: hidden;
    height: 500px;
  }
</style>
