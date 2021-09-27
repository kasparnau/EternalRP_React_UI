import logo from './logo.svg';
import './App.css';
import Phone from './Phone.jsx'
import React from 'react';

function App() {
  const [currentPage, setPage] = React.useState("main")
  return (
    <div className="App">
        <Phone
          currentPage={currentPage}
          setPage={(page) => {
            console.log("New page: " + page)
            setPage(page)
          }}
        />
    </div>
  );
}

export default App;
