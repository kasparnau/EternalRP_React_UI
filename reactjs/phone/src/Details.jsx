import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function Details(props){
    return (
        <div style={{backgroundColor: 'hsla(213, 18%, 12%, 1.0)', height: '100%', width: '100%'}}>
            <div style={{height: '100%', width: '100%', color: 'white'}}>
                <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '25%'}}>
                        <PersonIcon style={{color: 'white'}} fontSize="large"/>
                    </div>
                    <div style={{width: '100%', textAlign: 'left'}}>
                        1043
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '25%'}}>
                        <PhoneIphoneIcon style={{color: 'white'}} fontSize="large"/>
                    </div>
                    <div style={{width: '100%', textAlign: 'left'}}>
                        396-5436
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '25%'}}>
                        <AccountBalanceIcon style={{color: 'white'}} fontSize="large"/>
                    </div>
                    <div style={{width: '100%', textAlign: 'left'}}>
                        145
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '25%'}}>
                        <SavingsIcon style={{color: 'white'}} fontSize="large"/>
                    </div>
                    <div style={{width: '100%', textAlign: 'left'}}>
                        $235,699.00
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details