<template>
  <div style="height:100%">
    <div class="padding-left">
      <select class="select-PR">
        <option>Rama</option>
        <option>Audi</option>
        <option>BMW</option>
      </select>
      <select class="select-PR">
        <option>Categoria</option>
        <option>Audi</option>
        <option>BMW</option>
      </select>
      <select class="select-PR">
        <option>Otra opción</option>
        <option>Audi</option>
        <option>BMW</option>
      </select>
    </div>

    <l-map style="height: 90%; width:100%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-geo-json :geojson="bus.geojson" :options="bus.options"></l-geo-json>
      <l-geo-json :geojson="bicycleAndCampus.geojson" :options="bicycleAndCampus.options"></l-geo-json>
      <l-geo-json :geojson="comercio.geojson" :options="comercio.options"></l-geo-json>
    </l-map>
      <div id='bla'></div>
  </div>
</template>

<style>
.padding-left{
  padding-left:2em;
}
.select-PR {
  display: inline-block;
  width: 30%;
  height: calc(2.25rem + 2px);
  padding: .2em 1.75em .375em .75em;
  margin: 10px 15px 10px 15px;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' v…0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
  background-size: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 18px;
}

</style>


<script>
import Vue from 'vue';
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet';
import PopupContent from './GeoJson2Popup';

import { default as data } from '../assets/geojson/sample-geojson.js';
import { default as dataComercios } from '../assets/geojson/comercios-muni.js';

var baseballIcon = L.icon({
  iconUrl: 'static/images/baseball-marker.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28]
});

function onEachFeature(feature, layer) {
  let popupContent = Vue.extend(PopupContent);
  let popup = new popupContent({ propsData: { type: feature.properties.nombre_comercio, text: feature.properties.Actividad }});
  layer.bindPopup(popup.$mount().$el);
}

export default {
  name: 'example',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data () {
    return {
      zoom: 13,
      center: [-31.41,-64.20],
      url:'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w',
      attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',

      comercio: {
        geojson: dataComercios.comercios.features,
        options: {

            pointToLayer: function (feature, latlng) {
              return L.marker(latlng, {icon: baseballIcon});
            },
            onEachFeature: onEachFeature
        }
      },
      bus: {
        geojson: data.freeBus,
        options: {
          filter: function (feature, layer) {
            if (feature.properties) {
              return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
            }
            return false;
          },
          onEachFeature: onEachFeature
        }
      },
      bicycleAndCampus: {
        geojson: [ data.bicycleRental, data.campus ],
        options: {
          style: function (feature) {
            return feature.properties && feature.properties.style;
          },
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: 8,
              fillColor: "#ff7800",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          }
        }
      }
    }
  },
}
</script>
