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

const red = [ 255, 0, 0, 128 ];
const green = [ 0, 255, 0, 128 ];
const transparent = [ 0, 0, 0, 0 ];
const getTooltip = () => {};

const deckInstance = new deck.DeckGL({
  mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
  mapStyle: 'mapbox://styles/mapbox/dark-v11',
  container,
  initialViewState,
  getTooltip,
  controller: true,

  layers: [
    new deck.ScatterplotLayer({
      data: data,
      getPosition: (d) => [d.lng, d.lat],
      getFillColor: (d) => d.speed > 0 ? green : red,

      radiusMinPixels: 2,
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
