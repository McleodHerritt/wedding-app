import React from "react";
import "./RSVPs.css";

const RSVP = ({ rsvp, deleteRSVP, displayInfo = true }) => {
  return (
    <div className="rsvp-page.">
      <div className="rsvp-card">
        <p>Name: {rsvp.guestName}</p>
        {displayInfo && (
          <>
            <p>Attending: {rsvp.attending ? "Yes" : "No"}</p>
            <p>Meal Choice: {rsvp.mealChoice}</p>
          </>
        )}
        <button key={rsvp.id} onClick={() => deleteRSVP(rsvp._id)}>
          Sorry I can no longer make it
        </button>
      </div>
    </div>
  );
};

export default RSVP;
