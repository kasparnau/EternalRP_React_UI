import React from 'react';
import { Button, FilledInput, FormControl, InputLabel, TextField } from '@mui/material';
import sendNUI from './sendNUI'
import ping from './img/ping.png';

function Ping(props){
    const [target, setTarget] = React.useState('')

    async function sendTarget() {
        const result = await sendNUI('ping:send', target, true)

        if (result) {
            setTarget('')
        }
    }

    return (
        <div style={{height: '100%'}}>
            <div style={{height: '100%', backgroundImage: `url(${ping})`, backgroundSize: '100% 100%'}}>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
                    <div style={{width: '100%'}}>
                    <FormControl
                        style={{ width: '90%', marginBottom: '8px', backgroundColor: 'hsla(213, 18%, 12%, 0.992)' }}
                        variant="filled"
                    >
                        <InputLabel htmlFor="filled-adornment-amount" style={{color: 'white'}}>
                            Target ID
                        </InputLabel>
                        <FilledInput
                            value={target}
                            multiline
                            onChange={(event) => {
                                setTarget(event.target.value)
                            }}
                            style={{color: 'white'}}
                        />
                    </FormControl>
                    
                        <Button style={{backgroundColor: 'hsla(213, 18%, 12%, 0.992)', color: 'white', width: '90%', fontWeight: '700'}} onClick={sendTarget}>
                            SEND PING
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ping