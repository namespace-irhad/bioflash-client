import React, { useCallback, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import { Image, Button, Segment, Label, Icon } from "semantic-ui-react";
import { uploadImage } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

/**
 * Used for adding a crop option when uploading an image to the server
 */
export default function CropImage() {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [previewUrl, setPreviewUrl] = useState();
  const [upImg, setUpImg] = useState();
  const [open, setOpen] = useState(false);
  const [blobFile, setBlob] = useState();
  const dispatch = useDispatch();

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
    setOpen(true);
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, "newFile.jpeg");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (event) => {
    const newImage = new File([blobFile], blobFile.name, {
      type: blobFile.type,
    });
    const formData = new FormData();
    formData.append("image", newImage, newImage.name);
    dispatch(uploadImage(formData));
    setOpen(false);
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setBlob(blob);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };
  const handleImage = () => {
    const imageButton = document.getElementById("imageInput");
    imageButton.click();
  };

  return (
    <div className="App">
      <input
        type="file"
        accept="image/*"
        hidden="hidden"
        id="imageInput"
        onChange={onSelectFile}
      />
      <Label as="a" color="olive" image onClick={handleImage}>
        <Icon.Group size="large">
          <Icon name="user circle" />
          <Icon corner color="black" name="add" />
        </Icon.Group>
        Change Profile Picture
      </Label>
      {open && (
        <Segment
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(50%,-25%)",
            zIndex: "10",
          }}
        >
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={makeClientCrop}
          />
          {previewUrl && (
            <Segment>
              <Image alt="Crop preview" src={previewUrl} />
            </Segment>
          )}
          <Segment style={{ margin: "20px auto 0", textAlign: "center" }}>
            <Button.Group>
              <Button onClick={handleClose}>Cancel</Button>
              <Button.Or />
              <Button positive onClick={handleSave}>
                Save
              </Button>
            </Button.Group>
          </Segment>
        </Segment>
      )}
    </div>
  );
}
