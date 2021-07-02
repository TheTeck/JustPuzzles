import React, {useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import LoginPage from '../LoginPage/LoginPage'
import AdminPage from '../AdminPage/AdminPage'
import HomePage from '../HomePage/HomePage'
import TypeSelectPage from '../TypeSelectPage/TypeSelectPage'
import PlayPage from '../PlayPage/PlayPage'
import PuzzlePage from '../PuzzlePage/PuzzlePage'
import ViewPuzzlesPage from '../ViewPuzzlesPage/ViewPuzzlesPage'
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
          <Route exact path="/puzzle/:id/options">
            <TypeSelectPage />
          </Route>
          <Route exact path="/puzzle/:id">
            {/* <PlayPage /> */}
            <PuzzlePage />
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
                <Route exact path="/viewpuzzles">
                    <ViewPuzzlesPage />
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
