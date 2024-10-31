// Fetch the itinerary data and render it
fetch("itinerary.json")
  .then((response) => response.json())
  .then((data) => renderItinerary(data))
  .catch((error) => console.error("Error loading itinerary data:", error));

// Function to render the itinerary
function renderItinerary(data) {
  const container = document.getElementById("itinerary-container");

  // Create the main title and overview
  container.innerHTML = `
    <h1>${data.title}</h1>
    <p><strong>Duration:</strong> ${data.duration}</p>
    <p><strong>Start Date:</strong> ${data.startDate}</p>
    <p><strong>End Date:</strong> ${data.endDate}</p>
    <h2>Itinerary</h2>
  `;

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
            <td>${activity.description}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;
    container.appendChild(daySection);
  });
}
