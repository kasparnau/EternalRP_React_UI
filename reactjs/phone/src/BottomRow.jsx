import React from 'react';
import { Button } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function BottomRow(props){
    return (
        <div className="BottomRow">
            <div style={{ width: '100%', height: '100%'}}>
                <Button
                    onClick={() => {props.setPage('main')}}
                >   
                    <RadioButtonUncheckedIcon style={{color: 'white', width: '100%'}}/>
                </Button>
            </div>
        </div>
    )
}

export default BottomRow