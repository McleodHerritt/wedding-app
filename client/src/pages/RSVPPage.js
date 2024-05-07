import React, { useState } from "react";
import axios from "axios";

function RSVPPage() {
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [mealChoice, setMealChoice] = useState("");
  const [allergies, setAllergies] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rsvp = { guestName, attending, guestCount, mealChoice, allergies };
    try {
      await axios.post("/api/rsvps", rsvp);
      alert("RSVP submitted successfully!");
    } catch (error) {
      alert("Failed to submit RSVP:", error.message);
    }
  };

  return (
    <div>
      <h2>RSVP for the Wedding</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
        </label>
        <label>
          Attending:
          <select value={attending} onChange={(e) => setAttending(e.target.value === "true")}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>
          Number of Guests:
          <input type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} required />
        </label>
        <label>
          Meal Choice:
          <input type="text" value={mealChoice} onChange={(e) => setMealChoice(e.target.value)} />
        </label>
        <label>
          Allergies:
          <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
        </label>
        <button type="submit">Submit RSVP</button>
      </form>
    </div>
  );
}

export default RSVPPage;
