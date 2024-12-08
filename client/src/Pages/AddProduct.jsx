import React, { useState } from "react";

function AddProduct() {
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setGambar(file);
      setGambarPreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gambar", gambar);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.filePath) {
        setUploadStatus(
          `Gambar berhasil di-upload. Akses gambar di: http://localhost:8080${data.filePath}`
        );
      } else {
        setUploadStatus("Gagal upload gambar.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Terjadi kesalahan saat meng-upload gambar.");
    }
  };

  return (
    <div>
      <h1>Form Upload Gambar</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>

      {gambarPreview && (
        <div>
          <h2>Preview Gambar:</h2>
          <img src={gambarPreview} alt="Uploaded" width="300" />
        </div>
      )}

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default AddProduct;
