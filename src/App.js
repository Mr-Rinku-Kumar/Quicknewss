import React, { useState } from "react";
import Nav from "./components/Nav";
import Newss from "./components/Newss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



 const App = () => {
  const pageSize = 20;
  
  const [progress, setProgress] = useState(0)

    return (
      <Router>
      <div>
        <Nav />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
        <Routes>
          <Route exact path="/" element={ <Newss setProgress={setProgress}  pageSize={pageSize} country="us" category="general" />} />
          <Route exact path="/general" element={ <Newss setProgress={setProgress}  key="general" pageSize={pageSize} country="us" category="general" />} />
          <Route exact path="/business" element={ <Newss setProgress={setProgress}  key="business" pageSize={pageSize} country="us" category="business" />} />
          <Route exact path="/entertainment" element={ <Newss setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
          <Route exact path="/health" element={ <Newss setProgress={setProgress}  key="health" pageSize={pageSize} country="us" category="health" />} />
          <Route exact path="/science" element={ <Newss setProgress={setProgress}  key="science" pageSize={pageSize} country="us" category="science" />} />
          <Route exact path="/sports" element={ <Newss setProgress={setProgress}  key="sports" pageSize={pageSize} country="us" category="sports" />} />
          <Route exact path="/technology" element={ <Newss setProgress={setProgress}  key="technology" pageSize={pageSize} country="us" category="technology" />} />
        </Routes>
      </div>
    </Router>
    );
  
}
export default App;
