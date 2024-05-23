import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CouplesInfo.css"; // Import the CSS file
// Load environment variables
const correctUsername = process.env.REACT_APP_USERNAME;
const correctPassword = process.env.REACT_APP_PASSWORD;

function CouplesInfo() {
  const [updateTrigger, setUpdateTrigger] = useState(0); // This state will trigger updates in RSVPStats
  const [stats, setStats] = useState({
    name: [],
    totalAttending: 0,
    mealChoices: [],
    allergiesList: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchStats = async () => {
        try {
          const { data } = await axios.get("/api/rsvps/");
          const name = data.map((rsvp) => ({ guestName: rsvp.guestName, id: rsvp._id }));
          const totalAttending = data.filter((rsvp) => rsvp.attending).length;
          const mealChoices = data.reduce((acc, rsvp) => {
            if (rsvp.mealChoice) {
              acc[rsvp.mealChoice] = acc[rsvp.mealChoice] ? acc[rsvp.mealChoice] + 1 : 1;
            }
            return acc;
          }, {});
          const formattedMealChoices = Object.entries(mealChoices).map(([key, value]) => ({ _id: key, count: value }));
          const allergiesList = data.filter((rsvp) => rsvp.allergies).map((rsvp) => ({ guestName: rsvp.guestName, allergies: rsvp.allergies }));

          const statsObject = {
            name,
            totalAttending,
            mealChoices: formattedMealChoices,
            allergiesList,
          };

          setStats(statsObject);
        } catch (error) {
          console.error("Failed to fetch RSVP stats:", error);
        }
      };

      fetchStats();
    }
  }, [isAuthenticated, updateTrigger]);

  const deleteRSVP = async (id) => {
    try {
      await axios.delete(`/api/rsvps/delete/${id}`);
      alert("RSVP deleted successfully!");
      setUpdateTrigger((prev) => prev + 1); // Increment to trigger stats update
    } catch (error) {
      alert("Failed to delete RSVP:", error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect username or password.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="couples-info">
      <h2>RSVP Statistics</h2>
      <div className="stats-grid">
        <div className="stats-item">
          <h3>Total Attending</h3>
          <p>{stats.totalAttending}</p>
        </div>
        <div className="stats-item">
          <h3>Meal Choices</h3>
          <ul>
            {stats.mealChoices.map((item, index) => (
              <li key={index}>
                {item._id || "No Choice"}: {item.count}
              </li>
            ))}
          </ul>
        </div>
        <div className="stats-item">
          <h3>Allergies Noted</h3>
          <ul>
            {stats.allergiesList.map((allergy, index) => (
              <li key={index}>
                {allergy.guestName}: {allergy.allergies}
              </li>
            ))}
          </ul>
        </div>
        <div className="stats-item">
          <h3>Names</h3>
          <ul>
            {stats.name.map((guest, index) => (
              <li key={index}>
                {guest.guestName}
                <button onClick={() => deleteRSVP(guest.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CouplesInfo;
