import React from 'react'
import {Image, Box} from 'grommet'


export default function Results(props){
    if(!props.isCorrect)
        return (
        <Box>
            <Image
            fit="cover"
            src="./nope-try-again.jpeg"
            />
        </Box>
        );
    
    return(
    <Box>
        <Image
            fit="cover"
            src="./qed.png"
        />
    </Box>
    );
}

