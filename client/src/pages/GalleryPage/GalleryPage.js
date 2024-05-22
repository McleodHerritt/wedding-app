import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";

import "./GalleryPage.css"; // Ensure you have the CSS file correctly referenced

Modal.setAppElement("#root"); // Make sure to set the root element for accessibility

function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [description, setDescription] = useState(""); // State to hold the description of the photo
  const [uploadedBy, setUploadedBy] = useState(""); // State to hold the name of the person who uploaded the photo
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to handle modal open/close
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State to hold the selected photo for the modal
  const fileInputRef = useRef(); // Create a ref for the file input

  const fetchPhotos = async () => {
    try {
      const response = await axios.get("/gallery/getAll");
      const updatedPhotos = response.data.map((photo) => ({
        ...photo,
        imageUrl: `/uploads/${photo.imageUrl}`,
      }));

      setPhotos(updatedPhotos);
    } catch (error) {
      console.log("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleFileChange = (event) => {
    console.log("Selected file:", event.target.files[0]);
    setFile(event.target.files[0]); // Update the file state to the selected file
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("description", description);
    formData.append("uploadedBy", uploadedBy);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", response);
      fetchPhotos();

      // Reset form
      setFile(null);
      setDescription("");
      setUploadedBy("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (photoId) => {
    try {
      await axios.delete(`/gallery/delete/${photoId}`); // Match the endpoint exactly as defined in your Express route
      const updatedPhotos = photos.filter((photo) => photo._id !== photoId); // Properly filter out the deleted photo
      setPhotos(updatedPhotos);
      alert("Photo deleted successfully!");
    } catch (error) {
      console.error("Failed to delete photo:", error);
      alert("Failed to delete photo: " + error.response.data.message); // Providing error feedback to the user
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPhoto(null);
  };

  const ImageModal = ({ isOpen, onRequestClose, imageUrl, description }) => {
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="image-modal" overlayClassName="image-modal-overlay">
        <div className="modal-content">
          <img src={imageUrl} alt={description} className="modal-image" />
          <p>{description}</p>
          <button onClick={onRequestClose} className="close-button">
            Close
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="container">
      <h2>Wedding Gallery</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="text" onChange={(e) => setUploadedBy(e.target.value)} placeholder="Uploaded By" />
        <button type="submit">Upload Photo</button>
      </form>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo._id} className="gallery-item">
            <img src={photo.imageUrl} alt={photo.description} />
            <p>Uploaded by: {photo.uploadedBy}</p>
            <p>{photo.description}</p>
            <div className="button-container">
              <button onClick={() => openModal(photo)}>View</button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(photo._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} imageUrl={selectedPhoto.imageUrl} description={selectedPhoto.description} />
      )}
    </div>
  );
}

export default GalleryPage;
