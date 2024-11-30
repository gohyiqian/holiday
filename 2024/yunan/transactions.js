document
  .getElementById("transactionForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect form data
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const bookedBy = document.getElementById("bookedBy").value;
    const cost = parseFloat(document.getElementById("cost").value).toFixed(2);
    const imageFile = document.getElementById("image").files[0];

    // Convert image to base64 (optional, or upload separately)
    let imageBase64 = "";
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageBase64 = reader.result;

        // Create transaction object
        const transaction = {
          time,
          description,
          location,
          bookedBy,
          cost,
          image: imageBase64, // Or use a URL if uploading separately
        };

        // Simulate saving to localStorage or sending to a server
        saveTransaction(transaction);
      };
      reader.readAsDataURL(imageFile);
    } else {
      // Create transaction object without an image
      const transaction = {
        time,
        description,
        location,
        bookedBy,
        cost,
        image: null,
      };

      // Simulate saving to localStorage or sending to a server
      saveTransaction(transaction);
    }
  });

// Save transaction (simulate saving locally or sending to a server)
function saveTransaction(transaction) {
  // Simulate saving to localStorage (or replace with server API call)
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // Display success message
  document.getElementById("successMessage").style.display = "block";

  // Clear form
  document.getElementById("transactionForm").reset();
}
