import React from "react";

function Garage(props) {
  const { NUI } = { ...props };
  const [pageData, setPageData] = React.useState({});

  function reloadPage() {}

  React.useEffect(() => {
    reloadPage();
  }, []);

  return (
    <div style={{ height: "100%", backgroundColor: "rgb(25, 30, 36)" }}></div>
  );
}

export default Garage;
