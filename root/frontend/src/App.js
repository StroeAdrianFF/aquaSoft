import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap cdn
import NavBar from './Components/NavBar/NavBar.jsx';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage.jsx'
import SecondPage from './Components/SecondPage/SecondPage.jsx'
import {Provider} from 'react-redux'
import store from './store'


function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}> {/* connects the app to the store */}
          <NavBar/>
          <Switch>
            <Route exact path="/" component={MainPage}><Redirect to="/angajati"/></Route>
            <Route path="/angajati" component={MainPage}/>
            <Route path="/proiecte" component={SecondPage}/>
          </Switch>
        </Provider>
      </Router>
      
    </div>
  );
}

export default App;
