import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RSVPPage.css";

function RSVPPage() {
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [mealChoice, setMealChoice] = useState("");
  const [allergies, setAllergies] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(0); // This state will trigger updates in RSVPStats
  const [setRsvps] = useState([]);

  useEffect(() => {
    axios
      .get("/api/rsvps/")
      .then((res) => {
        setRsvps(res.data); // Assuming the response data is the array of RSVPs
      })
      .catch((error) => console.error("Error fetching RSVPs:", error));
  }, [setRsvps, updateTrigger]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rsvp = { guestName, attending, guestCount, mealChoice, allergies };
    try {
      await axios.post("/api/rsvps/add", rsvp);
      alert("RSVP submitted successfully!");
      setUpdateTrigger((prev) => prev + 1); // Increment to trigger stats update
      setGuestName("");
      setAttending(true);
      setGuestCount(1);
      setMealChoice("");
      setAllergies("");
    } catch (error) {
      alert("Failed to submit RSVP:", error.message);
    }
  };

  // const deleteRSVP = async (id) => {
  //   try {
  //     await axios.delete(`/api/rsvps/delete/${id}`);
  //     alert("RSVP deleted successfully!");
  //     setUpdateTrigger((prev) => prev + 1); // Increment to trigger stats update
  //   } catch (error) {
  //     alert("Failed to delete RSVP:", error.message);
  //   }
  // };

  return (
    <div className="rsvp-page">
      <h2>RSVP for the Wedding</h2>
      <div className="rsvp-form-container">
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required placeholder="Your Name" />
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
            <input type="number" value={guestCount} min="0" onChange={(e) => setGuestCount(e.target.value)} required placeholder="Number attending" />
          </label>
          <label>
            Meal Choice:
            <select value={mealChoice} onChange={(e) => setMealChoice(e.target.value)}>
              <option value="">Choose one</option>
              <option value="beef">Beef</option>
              <option value="chicken">Chicken</option>
              <option value="fish">Fish</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
          </label>
          <label>
            Allergies:
            <input
              className="allergies-input"
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Only if you have allergies"
            />
          </label>
          <div className="rsvp-button-container">
            <button className="submit-rsvp" type="submit">
              Submit RSVP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RSVPPage;
