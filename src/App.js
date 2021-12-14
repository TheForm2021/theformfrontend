import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './List';
import Form from './Form';
import Answers from './Answers';



const App = () => {

  //I have included a test_data.json file in the repository, that can be used instead of the REST api for test purposes.
  //let dataFromJson = require('./test_data.json');

  //https://theformback-sprint2.herokuapp.com/restquestionnarylist'

  const [data, setData] = useState([]);
  
  useEffect(() => {
      fetchData();
  }, [])

  const fetchData = () => {
      fetch('https://theformback-sprint3.herokuapp.com/restquestionnarylist')
      .then(response => response.json())
      .then(d => setData(d))
      .catch(err => console.error(err))
  }

  // router supports two different endpoints; one for listing the questionnaires (./) and another for the individual questionnaires (./form:id)
  return (
    
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/:user"}>
            <List data={ data } />
          </Route>
          <Route exact path={"/:admin"}>
            <List data={ data } />
          </Route>
          <Route exact path="/form/:id">
            <Form data={ data }/>
          </Route>
          <Route exact path="/answers/:id">
            <Answers data={ data }/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;