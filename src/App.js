import React from 'react'
import { Grommet, Page, PageContent, Card, CardHeader, Text, Box, Main, TextInput, Button } from 'grommet'
import { Checkmark } from 'grommet-icons'
import Results from './Results'
import { runPrompt } from './Gpt'
import Ocr from './Ocr';
const theme = {
  global: {
    font: {
      family: 'Arial',
      size: '14px',
      height: '20px',
    },
  },
};

export default function App() {
  const [value, setValue] = React.useState('');
  const [gpt, setGPT] = React.useState('');
  const [showgpt, setShowGPT] = React.useState(false);

  return (
    <Grommet full theme={theme}>
      <Page>
        <PageContent>
          <Card>
            <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="small" background={{"color":"black"}}>
              <Text size="4xl">
                QED.ai □
              </Text>
            </CardHeader>
            <Card>
              <Box align="center" justify="center" pad="xlarge" background={{"color":"active"}}>
                <Main fill="vertical" flex="grow" overflow="auto">
                  <Text>
                    Submit your math proof for validation:
                  </Text>
                  <Box align="center" justify="center" direction="row">
                    <TextInput value={value} onChange={event => setValue(event.target.value)}/>
                    <Button label="Submit" icon={<Checkmark />} hoverIndicator type="submit" gap="small" color="graph-3" onClick={()=>{
                      runPrompt(value)
                      .then(response => {
                        setGPT(response)
                        setShowGPT(true);
                      })
                      }}/>
                  </Box>
                  <Text>
                    {showgpt  &&
                      gpt
                    }
                  </Text>
                </Main>
              </Box>
              <Ocr />
            </Card>
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
