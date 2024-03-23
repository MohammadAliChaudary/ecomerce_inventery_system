import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImage from "../assets/cropImage";
import "../assets/imageCropper.css";
const CroppedImage = ({ images, setImage, setFile }) => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImage(images, croppedAreaPixels);
    setImage(croppedImageUrl);
    setFile(null);
  };

  const handleZoom = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  return (
    <div>
      <div className="backdrop"></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="crop-container">
          <Cropper
            image={images}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            cropShape="round"
            onCropComplete={onCropComplete}
          />
        </div>
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={handleZoom}
            className="slider"
          />
          <div className="button-area">
            <span
              style={{
                border: "solid 1px red",
                padding: "10px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                onCrop();
              }}
            >
              Crope
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CroppedImage;
