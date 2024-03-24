import React, { useState, useRef } from 'react';
import './TakePhoto.css'
import CommonButton from '../../Common/Button/Button';

const TakePhoto = ({ onImageCapture, ViewImage }) => {
  const [Hide,setHide]=useState(false)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      ViewImage(true, stream); // Pass true to indicate the image view mode and the video stream
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 300, 200); // Draw video frame onto canvas
    const photoData = canvasRef.current.toDataURL('image/png'); // Get photo data as base64
    onImageCapture(photoData); // Pass captured photo data back to parent component
  };

  return (
    <div >
      <div className="MainBtn"  style={{position:'relative'}}  >
        <div className="PhotoBtn" >
            <CommonButton className='takephotobtn' label='Take Photo' onClick={startCamera}/>
            <CommonButton className='Capturebtn' label='Capture' onClick={capturePhoto}/>
        </div>
      </div> 
      <div className='video'>
        <video ref={videoRef} width="178" height="240px" autoPlay muted></video>
        <canvas ref={canvasRef} style={{ display: 'none',borderRadius:'7px' }} width="178" height="178"></canvas>
      </div>
    </div>
  );
};

export default TakePhoto;
    