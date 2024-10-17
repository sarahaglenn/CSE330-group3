async function getAlerts() {
  const response = await fetch("../json/alerts.json")
  if (response.ok) {
    const data = await response.json();
    if (data.alerts.length > 0) {
      const alertSection = document.createElement("section");
      alertSection.classList = "alert-list";
      for (const alert of data.alerts) {
        const alertP = document.createElement("p");
        alertP.textContent = alert.message;
        alertP.style.background = alert.background;
        alertP.style.color = alert.color;
        alertP.style.textAlign = "center";
        alertSection.appendChild(alertP);
      }
      document.querySelector("main").prepend(alertSection);
    }
  }
}

getAlerts();
