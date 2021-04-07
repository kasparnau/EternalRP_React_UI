import logo from './logo.svg';
import './App.css';
import Main from './Main.jsx'
import React, { useState } from 'react';

function App() {
  const [canShow, updateShow] = useState(false)
  const [title, updateTitle] = useState('CURRENT MISSION')
  const [description, updateDescription] = useState('Hey')

  React.useEffect(() => {
    window.addEventListener("message", ((event) => {
      if (event.data.type == "show") {
        updateShow(true)
      } else if (event.data.type == "hide") {
        updateShow(false)
      } else if (event.data.type == "update") {
        if (event.data.title) {
          updateTitle(event.data.title)
        }
        if (event.data.desc) {
          updateDescription(event.data.desc)
        }
      }
    }))
  }, [])

  return (
    <div className="App">
      {canShow && (
        <Main 
          name={title}
          description={description}
        />
      )}
    </div>
  );
}

export default App;
