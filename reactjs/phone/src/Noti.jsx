import React from 'react';
import { Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Noti(props){
    return (
        <div className="Noti">
            <div style={{color: 'white', height: '100%', width: '100%'}}>
                <div className="NotiTopRow">
                    <div
                        style={{backgroundImage: 'linear-gradient(#9cc5e8, #9bc9fc)', height: '1vw', width: '1vw', borderRadius: '3px', marginLeft: '4px', marginRight: '4px'}}
                    >
                        <MoreHorizIcon fontSize="small" style={{color: 'white', height: '100%', width: '100%', position: 'relative', fontSize: '12px'}}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Arial, sans-serif', fontSize: '14px'}}>
                        {props.name}
                    </div>
                </div>
                <div className="NotiBottomRow">
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Arial, sans-serif', fontSize: '12px', marginLeft: '4px', marginRight: '4px'}}>
                        {props.description}
                    </div>
                </div>
            </div>
        </div>
    )
}