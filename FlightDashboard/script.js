// Αρχικοποίηση χάρτη
const map = L.map('map').setView([48.8566, 2.3522], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Mock data
fetch('data/flightData.json')
  .then(response => response.json())
  .then(data => {
    // Προβολή δεδομένων στον χάρτη
    data.forEach((point, index) => {
      L.marker([point.latitude, point.longitude])
        .addTo(map)
        .bindPopup(`Altitude: ${point.altitude}m<br>Speed: ${point.speed}km/h`)
        .openPopup();

      if (index > 0) {
        const prev = data[index - 1];
        L.polyline([
          [prev.latitude, prev.longitude],
          [point.latitude, point.longitude]
        ]).addTo(map);
      }
    });

    // Διαγράμματα
    const labels = data.map(d => d.timestamp);
    const altitudes = data.map(d => d.altitude);
    const speeds = data.map(d => d.speed);

    // Altitude Chart
    new Chart(document.getElementById('altitudeChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Altitude (m)',
          data: altitudes,
          borderColor: 'blue',
          fill: false
        }]
      }
    });

    // Speed Chart
    new Chart(document.getElementById('speedChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Speed (km/h)',
          data: speeds,
          borderColor: 'green',
          fill: false
        }]
      }
    });
  });
