import React from 'react';
import MainPage from './MainPage.jsx'
import BottomRow from './BottomRow.jsx'
import TopRow from './TopRow.jsx'

import Twitter from './Twitter.jsx'
import Ping from './Ping.jsx'
import Details from './Details.jsx'

import background from './img/background.jpg';

function Phone(props){
    return (
        <div className="PhoneHolder">
            <div className="Phone" style={{backgroundImage: `url(${background})`, backgroundSize: '100% 100%'}}>
                <TopRow />
                <div className="AppPage">
                    {props.currentPage == 'main' && <MainPage setPage={props.setPage} />}
                    {props.currentPage == 'details' && <Details />}
                    {props.currentPage == 'twitter' && <Twitter />}
                    {props.currentPage == 'ping' && <Ping />}
                </div>
                <BottomRow setPage={props.setPage} />
            </div>
        </div>
    )
}

export default Phone