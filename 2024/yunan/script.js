// Fetch the itinerary data and render it
fetch("itinerary.json")
  .then((response) => response.json())
  .then((data) => {
    renderItineraryInfo(data);
    renderItinerary(data);
  })
  .catch((error) => console.error("Error loading itinerary data:", error));

// Function to render the itinerary info section
function renderItineraryInfo(data) {
  const infoContainer = document.getElementById("itinerary-info");
  infoContainer.innerHTML = `
    <h1>${data.title}</h1>
    <p><strong>Duration:</strong> ${data.duration}</p>
    <p><strong>Start Date:</strong> ${data.startDate}</p>
    <p><strong>End Date:</strong> ${data.endDate}</p>
  `;
}

// Function to render the day-by-day itinerary
function renderItinerary(data) {
  const container = document.getElementById("itinerary-container");

  // Loop through each day and create the collapsible sections
  data.days.forEach((day) => {
    const daySection = document.createElement("details");
    daySection.open = true;
    daySection.innerHTML = `
      <summary>${day.dayTitle}</summary>
      <table>
        ${day.activities
          .map(
            (activity) => `
          <tr>
            <td>${activity.time}</td>
            <td>
              ${activity.description} 
              ${
                activity.url
                  ? `<a href="${activity.url}" target="_blank">${activity.location}</a>`
                  : activity.location || ""
              }
            </td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;
    container.appendChild(daySection);
  });
}
