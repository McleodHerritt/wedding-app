import React, { useEffect, useState } from "react";
import axios from "axios";

function RSVPStats({ updateTrigger }) {
  const [stats, setStats] = useState({
    name: "",
    totalAttending: 0,
    mealChoices: [],
    allergiesList: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/rsvps/");
        let totalAttending = data.filter((rsvp) => rsvp.attending).length;
        let mealChoices = data.reduce((acc, rsvp) => {
          if (rsvp.mealChoice) {
            acc[rsvp.mealChoice] = acc[rsvp.mealChoice] ? acc[rsvp.mealChoice] + 1 : 1;
          }
          return acc;
        }, {});
        mealChoices = Object.entries(mealChoices).map(([key, value]) => ({ _id: key, count: value }));
        let allergiesList = data.filter((rsvp) => rsvp.allergies).map((rsvp) => ({ allergies: rsvp.allergies }));

        const statsObject = {
          totalAttending,
          mealChoices,
          allergiesList,
        };

        console.log(statsObject);
        setStats(statsObject);
      } catch (error) {
        console.error("Failed to fetch RSVP stats:", error);
      }
    };

    fetchStats();
  }, [updateTrigger]);

  return (
    <div>
      <h2>RSVP Statistics</h2>
      <h3>Total Attending: {stats.totalAttending}</h3>
      <h3>Meal Choices:</h3>
      <ul>
        {stats.mealChoices.map((item, index) => (
          <li key={index}>
            {item._id || "No Choice"}: {item.count}
          </li>
        ))}
      </ul>
      <h3>Allergies Noted:</h3>
      <ul>
        {stats.allergiesList.map((allergy, index) => (
          <li key={index}>{allergy.allergies}</li>
        ))}
      </ul>
    </div>
  );
}

export default RSVPStats;
