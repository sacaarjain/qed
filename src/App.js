import React, { useEffect, useState } from 'react'
import { Grommet, Page, Card, CardHeader, Text, Box, Main, TextInput} from 'grommet'
import { FileInput } from 'grommet'
import { runPrompt } from './Gpt'
import './App.css';
const theme = {
  global: {
    font: {
      family: 'Arial',
      size: '14px',
      height: '20px',
    },
  },
};


// main ui code
export default function App() {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');  
  const [gpt, setGPT] = React.useState('');
  const [showgpt, setShowGPT] = React.useState(false);
  const [isFileQ, setIsFileQ] = React.useState(false);
  const [isFileA, setIsFileA] = React.useState(false);

  //MathPix
  const [ocrResultQ, setOcrResultQ] = useState('');
  const [ocrResultA, setOcrResultA] = useState('');
  const [fileQ, setFileQ] = useState(null);
  const [fileA, setFileA] = useState(null);

  useEffect(() => {
    handleOcrQ();
  }, [fileQ])

  useEffect(() => {
    handleOcrA();
  }, [fileA])

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

  async function handleOcrQ() {
    console.log("what the fuck")
    console.log(fileQ)
    try{
      await getBase64(fileQ, (base64string) => {
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
          setOcrResultQ(res.text)
          setIsFileQ(true)
          console.log("ocrResultQ: " + ocrResultQ)
        })
      })
    } catch(e){
      console.log(e.message)
    } 
  }

  async function handleOcrA() {
    try{
      await getBase64(fileA, (base64string) => {
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
          setOcrResultA(res.text)
          setIsFileA(true);
          console.log("ocrResultA: " + ocrResultA)
        })
      })
    } catch(e){
      console.log(e.message)
    } 
  }
//

  return (
    <Grommet full theme={theme}>
      <Page>
        <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="small" background={{"color":"#6307b3"}}>
          <Text size="4xl" color={"white"}>
            QED.ai
          </Text>
          <Text size="5xl" color={"white"}>
          □ 
          </Text>
        </CardHeader>
        <Card direction= "row" align= "center" pad= "small" round="none" >

            <Box align="left" direction="column" justify="center" flex= "grow" round="small" pad="xlarge" background={{"color":"white"}}>
              <Box justify="left" align="left">
                <h1 alignSelf='start'>QUESTION</h1>
                <Text></Text>
              </Box>
              <Main fill="vertical" flex="grow" overflow="auto" width="500px">
                <Box pad= {{bottom: "small"}} flex="grow">
                  <Text>
                    Type/Upload Problem
                  </Text>
                  <Box gap= "small" align="center" justify="center" direction="row">
                    <TextInput value={question} onChange={event => setQuestion(event.target.value)}/>
                  </Box>
                </Box>
                <Box width="500px">
                  <FileInput name="file" onChange={event => {
                    console.log(event.target.files[0])
                    setFileQ(event.target.files[0])
                  }} />
                </Box>
              </Main>
            </Box>
            <Box align="left" direction="column" justify="center" flex= "grow" round="small" pad="xlarge" background={{"color":"#2f3337"}}>
              <Box justify="left" align="left">
                <h1 alignSelf='start'>ANSWER</h1>
                <Text></Text>
              </Box>
              <Main fill="vertical" flex="grow" overflow="auto" width="500px">
                <Box pad= {{bottom: "small"}} flex="grow">
                  <Text>
                    Type/Upload Your Work
                  </Text>
                  <Box gap= "small" align="center" justify="center" direction="row">
                    <TextInput value={answer} onChange={event => setAnswer(event.target.value)}/>
                  </Box>
                </Box>
                <Box width="500px">
                <FileInput FileInput={{extend: `flex: 'overfill'`}} name="file" onChange={event => {
                    setFileA(event.target.files[0])
                  }} />
                </Box>
              </Main>
            </Box>
        </Card>
        <div class="test">
          <button class="button-61" width="100px" role="button" fdprocessedid="o7e4yy" style={{width: "132px", align: "center"}} onClick={()=>{
            if(isFileQ && !isFileA){
              console.log("if statement 1")
              runPrompt(ocrResultQ, answer)
              .then(response => {
                setGPT(response)
                setShowGPT(true);
              })
            }
            else if(!isFileQ && isFileA){
              console.log("if statement 2")
              runPrompt(question, ocrResultA)
              .then(response => {
                setGPT(response)
                setShowGPT(true);
              })
            }
            else if(isFileQ && isFileA){
              console.log("if statement 3")
              runPrompt(ocrResultQ, ocrResultA)
              .then(response => {
                setGPT(response)
                setShowGPT(true);
              })
            }
            else{
              console.log("if statement 4")
              runPrompt(question, answer)
              .then(response => {
                setGPT(response)
                setShowGPT(true);
              })
            }
            setIsFileQ(false);
            setIsFileA(false);
            setFileQ(null);
            setFileA(null);
            setOcrResultQ('');
            setOcrResultA('');
            }}>Submit</button>
        </div>
        <Card>
          <div class="css-fix">
            {showgpt  &&
              gpt
            }
          </div>
        </Card>
      </Page>
    </Grommet>
  )
}
