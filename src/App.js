import React, { useEffect } from 'react'
import { Grommet, Page, PageContent, Card, CardHeader, Text, Box, Main, TextInput, Button, FileInput } from 'grommet'
import { Checkmark } from 'grommet-icons'
import Results from './Results'
import { runPrompt } from './Gpt'
import {useState} from 'react'
import Ocr from './Ocr';
import Math from './Math'
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
  const [value, setValue] = React.useState('');
  const [value2, setValue2] = React.useState('');  

    // <Results>: result-based image rendering component
  return (
    <Grommet full theme={theme}>
      <Page>
        <PageContent>
          <Card>
            <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="small" background={{"color":"#6307b3"}}>
              <Text size="4xl" color={"white"}>
                QED.ai □
              </Text>
            </CardHeader>
            <Card direction= "row" align= "center" pad= "small">
              <Box align="center" direction="column" justify="center" flex= "grow" round="small" pad="xlarge" background={{"color":"white"}}>
                <Main fill="vertical" flex="grow" overflow="auto">
                  <Text>
                    Type/Upload Problem
                  </Text>
                  <Box align="center" justify="center" direction="row">
                    <TextInput value={value} onChange={event => setValue(event.target.value)}/>
                    <Button label="Upload" hoverIndicator type="submit" gap="small" color="graph-3" onClick={()=>{runPrompt(value)}}/>
                  </Box>
                  <FileInput>
                  </FileInput>
        
                </Main>
              </Box>
              <Box align="center" direction="column" justify="center" flex= "grow" round="small" pad="xlarge" background={{"color":"#2f3337"}}>
                <Main fill="vertical" flex="grow" overflow="auto">
                  <Text>
                    Submit your math proof for validation:
                  </Text>
                  <Box align="center" justify="center" direction="column" gap= "small">
                    <TextInput value={value2} onChange={event => setValue2(event.target.value)}/>
                  </Box>
                </Main>
              </Box>
            </Card>
            <Math />
            <Card>
              <Results
              isCorrect = {true}
              />
            </Card>
          </Card>
        </PageContent>
      </Page>
    </Grommet>
  )
}
