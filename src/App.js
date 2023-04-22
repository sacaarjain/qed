import React from 'react'
import { Grommet, Page, PageContent, Card, CardHeader, Text, Box, Main, TextInput, Button, FileInput } from 'grommet'
import { Checkmark } from 'grommet-icons'
import Results from './Results'
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
    // <Results>: result-based image rendering component
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
                    <TextInput />
                    <Button label="Submit" icon={<Checkmark />} hoverIndicator type="submit" gap="small" color="graph-3" />
                  </Box>
                </Main>
              </Box>
              <Box align="center" justify="center">
                <Text>
                   or...
                </Text>
                <Box align="center" justify="center" direction="column">
                  <FileInput renderFile={10} a11yTitle="image" />
                  <Button label="Submit" icon={<Checkmark />} />
                </Box>
              </Box>
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
