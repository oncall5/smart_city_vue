import L from 'leaflet'
const MAX_ZOOM = 18;
const MIN_ZOOM = 2;
const GaoDe_URL = "GaoDe.Normal.Map";

let Map = L.Map.extend({
  options: {
    _lastUsedMapType: null
  }
});
Map.include({
  getMapType: function() {
    return this.mapType;
  },
  setMapType: function(mapType) {
    if (!mapType || mapType == this.mapType) {
      return;
    }
    this.mapType = mapType;
    // 防止重复加载相同类型地图
    if (this.options._lastUsedMapType === mapType) {
      return;
    }
    if (this.options._lastUsedMapType === null) {
      this.options._lastUsedMapType = mapType;
    }

    if (this.layer) {
      this.removeLayer(this.layer);
    }

    if (this.layer_overlay) {
      this.removeLayer(this.layer_overlay);
    }

    let center = this.getCenter();
    let zoom = this.getZoom();
    switch (mapType) {
      case "map":
        this._drawMapLayer();
        break;
      case "baidu":
        this._drawMapLayer();
        break;
    }
    this._resetView(center, zoom, true);
    this.options._lastUsedMapType = mapType;
  },
  _drawMapLayer: function() {
    let layer = L.tileLayer.chinaProvider(GaoDe_URL, {
      maxZoom: MAX_ZOOM,
      minZoom: MIN_ZOOM,
      continuousWorld: true,
    });
    this.layer = layer;
    this.addLayer(this.layer);
  },
});
export default Map;