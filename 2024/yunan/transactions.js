import { db, collection, addDoc } from "./firebase.js";

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

    // Create transaction object without an image
    const transaction = {
      time,
      description,
      location,
      bookedBy,
      cost,
    };

    // Simulate saving to localStorage or sending to a server
    //   saveTransaction(transaction);
    try {
      // Add transaction to Firestore
      const docRef = await addDoc(collection(db, "transactions"), transaction);
      console.log("Transaction added with ID:", docRef.id);

      // Show success message
      document.getElementById("successMessage").style.display = "block";

      // Clear form
      document.getElementById("transactionForm").reset();
    } catch (e) {
      console.error("Error adding document:", e);
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
