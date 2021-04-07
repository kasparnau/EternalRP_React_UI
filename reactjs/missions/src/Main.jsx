import React from 'react';
import { Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Main(props){
    return (
        <div className="Main">
            <div style={{color: 'white', height: '100%', width: '100%'}}>
                <div className="TopRow">
                    <div
                        style={{backgroundImage: 'linear-gradient(#9cc5e8, #9bc9fc)', height: '1vw', width: '1vw', margin: '8px', borderRadius: '3px'}}
                    >
                        <MoreHorizIcon style={{color: 'white', height: '100%', width: '100%', position: 'relative'}}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Roboto, sans-serif'}}>
                        {props.name}
                    </div>
                </div>
                <div className="BottomRow">
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Arial, sans-serif', margin: '8px'}}>
                        {props.description}
                    </div>
                </div>
            </div>
        </div>
    )
}