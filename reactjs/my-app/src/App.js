import './App.css';
import React, { useState } from 'react';
import Circle from './Circle.jsx';
import sendNUI from './sendNUI.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1  
}

var interval = null

function App() {
  const [percentage, setPercentage] = useState(0)
  const [key, setKey] = useState(1)
  const [target, setTarget] = useState(90)
  const [color, setColor] = useState("white")
  const [canShow, updateShow] = useState(false)

  function start(speed, target){
    const currSpeed = speed

    setTarget(target)

    interval = setInterval(function () {
      setPercentage((value) => {
        if (value < 100) { 
          return value + currSpeed
        } else {
          clearInterval(interval)
          sendNUI("completed", {success: false}, () => {})
        }
      })

    }, 0.1);
  }

  React.useEffect(() => {
    window.addEventListener("message", ((event) => {
      if (event.data.type == "show") {
        updateShow(true)
      } else if (event.data.type == "hide") {
        updateShow(false)
      } else if (event.data.type == "start") {
        setPercentage(0)
        const newKey = getRandomInt(4)
        setKey(newKey)
        start(event.data.speed, event.data.target)
      }
    }))

    window.addEventListener("keydown", ((event) => {
        var currKey = null;
        setKey((value) => {
          currKey = value
          return value
        })
        var success = null;
        if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4) {
          clearInterval(interval)
          if (event.key == currKey) {
            var perc = 0
            var targ = 0

            setPercentage((value) => {
              perc = value 
              return value
            })
            setTarget((value) => {
              targ = value 
              return value
            })

            const min = targ/360*100
            const max = min+14

            if (perc >= min && perc <= max) {
              success = true
            } else {
              success = false
            }

            sendNUI("completed", {success}, () => {})
          } else {
            success = false
            sendNUI("completed", {success}, () => {})
          }
        }
    }))
  }, [])

  return (
    <div className="App" style={{display: canShow ? 'block' : 'none'}}>
        <Circle 
          circleP={percentage}
          circleT={target}
          progressColor={color}
          actionKey={key}
        />
    </div>
  );
}

export default App;
