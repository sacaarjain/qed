import React, { useEffect } from 'react'
import { Grommet, Page, Card, CardHeader, Text, Box, Main, TextInput} from 'grommet'
import { runPrompt } from './Gpt'
import Math from './Math'
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

    // <Results>: result-based image rendering component
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
              <Main fill="vertical" flex="grow" overflow="auto">
                <Box pad= {{bottom: "small"}} flex="grow">
                  <Text>
                    Type/Upload Problem
                  </Text>
                  <Box gap= "small" align="center" justify="center" direction="row">
                    <TextInput value={question} onChange={event => setQuestion(event.target.value)}/>
                  </Box>
                </Box>
                <Box>
                  <Math />
                </Box>
              </Main>
            </Box>
            <Box align="left" direction="column" justify="center" flex= "grow" round="small" pad="xlarge" background={{"color":"#2f3337"}}>
              <Box justify="left" align="left">
                <h1 alignSelf='start'>ANSWER</h1>
                <Text></Text>
              </Box>
              <Main fill="vertical" flex="grow" overflow="auto">
                <Box pad= {{bottom: "small"}} flex="grow">
                  <Text>
                    Type/Upload Your Work
                  </Text>
                  <Box gap= "small" align="center" justify="center" direction="row">
                    <TextInput value={answer} onChange={event => setAnswer(event.target.value)}/>
                  </Box>
                </Box>
                <Box>
                  <Math />
                </Box>
              </Main>
            </Box>
        </Card>
        <div class="test">
          <button class="button-61" width="100px" role="button" fdprocessedid="o7e4yy" style={{width: "132px", align: "center"}} onClick={()=>{
            runPrompt(question, answer)
            .then(response => {
              setGPT(response)
              setShowGPT(true);
            })
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
