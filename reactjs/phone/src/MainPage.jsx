import React from 'react';
import { Button } from '@material-ui/core';

import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ContactsIcon from '@material-ui/icons/Contacts';
import HomeIcon from '@material-ui/icons/Home';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CallIcon from '@material-ui/icons/Call';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FlagIcon from '@material-ui/icons/Flag';
import Noti from './Noti.jsx'

function AppButton(props) {
    let [over,setOver]=React.useState(false);
    return (
        <div>
            <Button 
                onClick={() => {props.setPage(props.name)}}
                style={{height: '3vw', width: '3vw', backgroundImage: props.gradient, margin: '3px', borderRadius: '20px'}}
                onMouseOver={()=>setOver(true)} 
                onMouseOut={()=>setOver(false)}          
            >
                {props.content}
            </Button>
        </div>
    )
}

function MainPage(props){
    return (
        <div style={{position: 'relative', height: '100%'}}>
            <div className="NotiContainer">
                {/* <Noti 
                    name="CURRENT"
                    description="Deliver the cheetos to the bitch ass nigga (1/5). Deliver the cheetos to the bitch ass nigga (1/5)."                    
                />
                <Noti 
                    name="CURRENT"
                    description="Deliver the cheetos to the bitch ass nigga (1/5)."                    
                /> */}
            </div>
            <div className="MainPageButtons">
                <AppButton
                    gradient='linear-gradient(#17171f, #17171f)'
                    content={
                        <TwitterIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="twitter"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#395a7c, #091735)'
                    content={
                        <ContactsIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="contacts"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#5bba96, #137b47)'
                    content={
                        <CallIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="calls"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#87ea65, #05a316)'
                    content={
                        <ChatBubbleIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="messages"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#9b17ef, #5b6ff2)'
                    content={
                        <LocationOnIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="ping"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#21aaec, #85e5ec)'
                    content={
                        <MailIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="mail"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#ff9280, #c54463)'
                    content={
                        <DirectionsCarIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="garage"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#c06331, #da8a37)'
                    content={
                        <FlagIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="race"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#6a9265, #ca5959)'
                    content={
                        <ShowChartIcon style={{color: '#87f54e'}} fontSize="large"/>
                    }
                    name="stock"
                    setPage={props.setPage}
                />
                <AppButton
                    gradient='linear-gradient(#3e914b, #3e914b)'
                    content={
                        <HomeIcon style={{color: 'white'}} fontSize="large"/>
                    }
                    name="apartments"
                    setPage={props.setPage}
                />
            </div>
        </div>
    )
}

export default MainPage