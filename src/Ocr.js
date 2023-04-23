import React, { useState } from 'react';
import axios from 'axios';
import { Grommet, Page, PageContent, Card, CardHeader, Text, Box, Main, TextInput, Button, FileInput } from 'grommet'
import { Checkmark } from 'grommet-icons'

export default function Ocr() {
  const [ocrResult, setOcrResult] = useState('');
  const [file, setFile] = useState(null);
  const [isFetchingResult, setIsFetchingResult] = useState(false);
  const [operationLocation, setOperationLocation] = useState(null);
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(true);

  function handleFileChange(event) {
    setOcrResult('');
    setOperationLocation(null);
  }

  function handleOcr() {
    if (!file) {
      alert('Please select an image file.');
      return;
    
    }
    setIsDisabled1(true)
    setIsDisabled2(false)

    setIsFetchingResult(true);

    // Upload the image file to the server
    const formData = new FormData();
    formData.append('file', file);
    axios.post('https://qedendpoint2023.cognitiveservices.azure.com/vision/v3.1/read/analyze', formData, {
      headers: {
        'Ocp-Apim-Subscription-Key': 'df3e6b1da5ad4b18ba803c9162223146',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      const operationUrl = response.headers['operation-location'];
      setOperationLocation(operationUrl);
      setIsFetchingResult(false);
    })
    .catch(error => {
      console.error(error);
      setIsFetchingResult(false);
    });
  }

  function handleGetResult() {
    setIsDisabled1(false)
    setIsDisabled2(true)

    // Get the OCR result from the server
    axios.get(operationLocation, {
      headers: {
        'Ocp-Apim-Subscription-Key': 'df3e6b1da5ad4b18ba803c9162223146'
      }
    })
    .then(response => {
      const lines = response.data.analyzeResult.readResults[0].lines;
      const message = lines.map(line => line.text).join('\n');
      setOcrResult(message);
      setIsFetchingResult(false);
    })
    .catch(error => {
      console.error(error);
      setIsFetchingResult(false);
    });
  }

  function OcrResult(props) {
    return (
      <div align="center">
        {props.result ? (
          <p>{props.result}</p>
        ) : (
          <p>No result yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <Box align="center" justify="center">
                <Text>
                   
                </Text>
                <Box align="center" justify="center" direction="column">
                  <FileInput name="file" onChange={event => {
                    setFile(event.target.files[0]);
                    handleFileChange()
                    }} />
                  <Button label="Submit" disabled = {isDisabled1} onClick={event => {handleOcr()}}/>
                  <Button label="Show Result" disabled = {isDisabled2} onClick={event => {handleGetResult()}}/>
                </Box>
        </Box>
        <OcrResult result={ocrResult} />
    </div>
  );
}