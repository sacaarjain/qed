import React, { useState } from 'react';
import axios from 'axios';

function Math() {
  const [ocrResult, setOcrResult] = useState('');
  const [file, setFile] = useState(null);
  const [showResult, setShowResult] = useState(false);

  async function getBase64(file, cb){
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(){
      cb(reader.result)
    }
    reader.onerror = function(error){
      console.log("error: ", error)
    }
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    setOcrResult('');
  }

  async function handleOcr() {
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    try{
      await getBase64(file, (base64string) => {
        fetch('https://api.mathpix.com/v3/text', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
            'app_id': 'jeongjooho1995_gmail_com_1f0f89_a1c675',
            'app_key': '6c9826233604a6aaf8a6f2f1816e1474a779fc2c85b2d41324887be8061a5c43'
          },
          body: JSON.stringify({
              src: base64string,
              formats: ['text', 'data', 'html'],
              data_options: {
                include_asciimath: true,
                include_latex: true
              }
          })
        })
        .then(response => {
          return response.json()
        })
        .then(res => {
          setOcrResult(res.text)
          setShowResult(true)
        })
      })
    } catch(e){
      console.log(e.message)
    } 
  }

  return (
    <div className="App">
      <h1>OCR Example</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleOcr}>Run OCR</button>
      <p>
        {showResult &&
            ocrResult
        }
      </p>

    </div>
  );
}

export default Math;