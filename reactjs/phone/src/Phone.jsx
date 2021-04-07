import React from 'react';
import MainPage from './MainPage.jsx'
import BottomRow from './BottomRow.jsx'
import TopRow from './TopRow.jsx'
import Twitter from './Twitter.jsx'

function Phone(props){
    return (
        <div className="Phone">
            <TopRow />
            <div className="AppPage">
                {props.currentPage == 'main' && <MainPage setPage={props.setPage} />}
                {props.currentPage == 'twitter' && <Twitter />}
            </div>
            <BottomRow setPage={props.setPage} />
        </div>
    )
}

export default Phone