import React, { useState } from "react";
import { motion } from "framer-motion";
import "./invitationPage.css";

function InvitationPage() {
  const [isFlapOpen, setIsFlapOpen] = useState(false);

  const toggleFlap = () => {
    setIsFlapOpen(!isFlapOpen);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "ease",
        stiffness: 60,
        damping: 10,
        duration: 1,
      }}
      className="invitation-card"
    >
      {/* Envelope */}
      <div className="envelope" onClick={toggleFlap}>
        <div className={`flap ${isFlapOpen ? "open" : ""}`}>
          {isFlapOpen ? null : (
            <div className="text-overlay">
              {/* <h1>You're Invited!</h1> */}
              <p>Click to open</p>
            </div>
          )}
        </div>

        <div className={`content-behind-flap ${isFlapOpen ? "open" : ""}`}>
          {/* Content behind the flap */}

          <h2>
            Randy and Nicole would like to invite you to celebrate in the joining of their families. Share in the joy, love, and excitment of their
            happily ever after.
          </h2>
          <div>
            <div className="details">
              <p>Date: [Date]</p>
              <p>Time: [Time]</p>
              <p>Location: [Venue]</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default InvitationPage;
