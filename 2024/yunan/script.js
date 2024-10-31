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
  // Calculate the total trip cost, and individual costs for YQ and ZY
  let totalTripCost = 0;
  let totalCostByYQ = 0;
  let totalCostByZY = 0;

  data.days.forEach((day) => {
    day.activities.forEach((activity) => {
      const cost = activity.cost || 0;
      totalTripCost += cost;

      // Sum up costs based on `bookedBy`
      if (activity.bookedBy === "YQ") {
        totalCostByYQ += cost;
      } else if (activity.bookedBy === "ZY") {
        totalCostByZY += cost;
      }
    });
  });

  const infoContainer = document.getElementById("itinerary-info");
  infoContainer.innerHTML = `
    <h1>${data.title}</h1>
    <p><strong>Duration:</strong> ${data.duration}</p>
    <p><strong>Start Date:</strong> ${data.startDate}</p>
    <p><strong>End Date:</strong> ${data.endDate}</p>
    <p><strong>Total Trip Cost:</strong> $${totalTripCost}</p>
    <p><strong>Total Cost by YQ:</strong> $${totalCostByYQ}</p>
    <p><strong>Total Cost by ZY:</strong> $${totalCostByZY}</p>
  `;
}

// Function to render the day-by-day itinerary
function renderItinerary(data) {
  const container = document.getElementById("itinerary-container");

  // Loop through each day and create the collapsible sections
  data.days.forEach((day) => {
    const daySection = document.createElement("details");
    daySection.open = true;

    // Calculate the total cost for the day
    let totalCost = day.activities.reduce(
      (sum, activity) => sum + (activity.cost || 0),
      0
    );

    // Create the HTML content for the day's details
    daySection.innerHTML = `
      <summary>${day.dayTitle}</summary>
      <table>
        <tr>
          <th>Time</th>
          <th>Description</th>
          <th>Booked By</th>
          <th>Cost</th>
        </tr>
        ${day.activities
          .map((activity) => {
            // Determine font color based on `bookedBy` value
            const bookedByStyle =
              activity.bookedBy === "YQ"
                ? "color: blue;"
                : activity.bookedBy === "ZY"
                ? "color: green;"
                : "";

            return `
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
              <td style="${bookedByStyle}">${activity.bookedBy || "-"}</td>
              <td>${activity.cost ? `$${activity.cost}` : "-"}</td>
            </tr>
          `;
          })
          .join("")}
        <tr>
          <td colspan="3" style="font-weight: bold; text-align: right;">Total Cost</td>
          <td style="font-weight: bold;">$${totalCost}</td>
        </tr>
      </table>
    `;
    container.appendChild(daySection);
  });
}
