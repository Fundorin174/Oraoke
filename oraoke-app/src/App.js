import React from 'react';
import './App.scss';
import {Redirect, Route, Switch} from "react-router";
import StartPageContainer from "./components/StartPageContainer";
import SettingsPageContainer from "./components/SettingsPageContainer";
import SongChoosePageContainer from "./components/SongChoosePageContainer";
import SongPlayPageContainer from "./components/SongPlayPageContainer";

function App() {
  return (
    <div className="App">
      <Switch>
        < Route exact path = '/'
                render = {
                  () => < Redirect to = {
                    '/start-page'
                  }
                  />
                }
        />
        <Route path='/start-page' render={() => <StartPageContainer />}/>
        <Route path='/settings-page' render={() => <SettingsPageContainer />}/>
        <Route path='/song-choose-page' render={() => <SongChoosePageContainer />}/>
        <Route path='/song-play-page' render={() => <SongPlayPageContainer />}/>
        <Route path='*' render={() => <div>404 Page not found</div>}/>
      </Switch>
    </div>
  );
}

export default App;
