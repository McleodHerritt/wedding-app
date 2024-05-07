import React, { useEffect, useState } from "react";
import axios from "axios";

function GalleryPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("/api/photos");
        setPhotos(response.data);
      } catch (error) {
        console.log("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h2>Wedding Gallery</h2>
      <div>
        {photos.map((photo) => (
          <div key={photo._id}>
            <img src={photo.imageUrl} alt={photo.description} />
            <p>{photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
