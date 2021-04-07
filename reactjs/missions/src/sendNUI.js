import React from 'react';

function sendNUI(action, data, cb) {
    fetch(`https://missions/nuiAction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            action,
            data
        })
    }).then(resp => resp.json()).then((resp) => {
        console.log(resp)
        cb(resp)
    });
}

export default sendNUI