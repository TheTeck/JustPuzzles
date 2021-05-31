import React, {useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from '../LoginPage/LoginPage'
import AdminPage from '../AdminPage/AdminPage'
import HomePage from '../HomePage/HomePage'
import TypeSelectPage from '../TypeSelectPage/TypeSelectPage'
import adminService from '../../utils/adminService'


function App() {

  const [admin, setAdmin] = useState(adminService.getUser()) // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like 
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin(){
    setAdmin(adminService.getUser()) // getting the user from localstorage decoding the jwt
  }

  function handleLogout(){
    adminService.logout();
    setAdmin({admin: null})
  }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/puzzle/:id">
            <TypeSelectPage />
          </Route>
          <Route exact path="/">
              <HomePage pageNum={1} />
          </Route>
          {adminService.getUser() ? 
            <> 
             <Switch>
                <Route exact path="/admin">
                    <AdminPage admin={admin} handleLogout={handleLogout} />
                </Route>
            </Switch>
            </>
            :
            <Redirect to='/'/>
          }
  
      </Switch>
    </div>
  );
}

export default App;
