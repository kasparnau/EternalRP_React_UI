import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const lerp = (x, y, a) => x * (1 - a) + y * a;

function Circle(props) {
    const circumference = 52 * 2 * Math.PI
    const offset = circumference - props.circleP / 100 * circumference;
    
    return(
        <div>
            <div style={{
                paddingTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <div style={{
                    position: 'relative',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}>
                    <svg
                    class="progress-ring"
                    width="120"
                    height="120">
                    <circle
                        class="progress-ring__circle"
                        stroke="#28313a"
                        stroke-width="12"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                        strokeDasharray={`1, 0`}
                        strokeDashoffset="0"
                    />
                        <svg
                        class="progress-ring"
                        width="120"
                        height="120">
                        <circle
                            class="progress-ring__circle"
                            style={{transform: `rotate(${props.circleT-90}deg)`, zIndex: 9}}
                            stroke="#279787"
                            stroke-width="12"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                            strokeDasharray={`45, 360`}
                            strokeDashoffset={'0'}
                        />
                        </svg>
                        <svg
                        class="progress-ring"
                        width="120"
                        height="120">
                        <circle
                            class="progress-ring__circle"
                            style={{zIndex: 10}}
                            stroke="white"
                            stroke-width="12"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                            strokeDasharray={`${circumference}, ${circumference}`}
                            strokeDashoffset={offset}
                        />
                        </svg>
                </svg>
                    <div style={{
                        position: 'absolute',
                        color: `${props.progressColor}`,
                        fontSize: '3vw',
                        fontFamily: 'Verdana, Arial, Tahoma, Serif',
                    }}
                    >
                        {props.actionKey}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Circle;