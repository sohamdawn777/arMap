window.onload = () => {
  // Initialize Leaflet map
  const map = L.map("map", { center:[22.526911,88.377648], zoom: 19, maxZoom: 19, minZoom: 1 });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom:19, minZoom:1 }).addTo(map);

  // Marker
  const marker = L.marker([22.526911,88.377648], { 
    icon: L.icon({ iconUrl: "graffitiIco.png", iconSize: [32,32], iconAnchor: [16,32], popupAnchor: [0,-32] }),
    title: "Graffiti Spot", draggable: false, riseOnHover: true 
  }).addTo(map);

  marker.bindPopup(`<p>An act of defiance- this is a symbol of asserting their independence from an oppressive patriarchy.</p>`, 
    { maxWidth: 200, minWidth: 50, autoPan: true, closeButton: true, keepInView: true });
  marker.on("click", function() { this.openPopup(); });

  L.circle([22.526911,88.377648], { radius: 15, color: "blue", fillColor: "blue", fillOpacity: 0.2 }).addTo(map);

  // ---------- DYNAMIC "VIEW IN AR" BUTTON ----------
  const btn = document.createElement("button");
  btn.id = "view-ar-btn";
  btn.innerText = "View in AR";

  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.padding = "10px 20px";
  btn.style.backgroundColor = "#007bff";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "5px";
  btn.style.cursor = "pointer";
  btn.style.zIndex = "1000";

  btn.addEventListener("click", () => {
    const arContainer = document.getElementById("ar-container");

    // Prevent multiple scenes
    if (arContainer.childElementCount > 0) return;

    // Create AR scene
    const scene = document.createElement("a-scene");
    scene.setAttribute("embedded", "");
    scene.setAttribute("arjs", "trackingMethod: best; sourceType: webcam; debugUIEnabled: false;");
    scene.setAttribute("vr-mode-ui", "enabled: false");

    // Marker
    const markerEntity = document.createElement("a-marker");
    markerEntity.setAttribute("preset", "hiro");

    // 3D model
    const entity = document.createElement("a-entity");
    entity.setAttribute("gltf-model", "url(https://raw.githubusercontent.com/sohamdawn777/arMap/main/scene.glb)");
    entity.setAttribute("scale", "1 1 1");
    entity.setAttribute("position", "0 0 0");

    markerEntity.appendChild(entity);
    scene.appendChild(markerEntity);

    // Camera
    const camera = document.createElement("a-camera");
    scene.appendChild(camera);

    arContainer.appendChild(scene);
    scene.scrollIntoView({ behavior: "smooth" });
  });

  document.body.appendChild(btn);
};
