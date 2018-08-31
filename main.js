import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import BrowserHistory from './routes/history'


import routes from './routes'

import configureStore from './store/configureStore'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import './asset/app.scss'

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)
let store = configureStore(window.__INITIAL_STATE__, DevTools)

const handUpdatePath = () =>{
  let routingState = store.getState().routing;
  let routeAction = routingState.locationBeforeTransitions.action;
  if(routeAction == "PUSH"){
    window.scrollTo(0, 0);
  }
}

const renderDOM = Component => {
  if(process.env.NODE_ENV === 'production'){
    render(
      <Provider store={store}>
        {routes}
      </Provider>,
      document.getElementById('app')
    );
  }
  else{
    render(
      <Provider store={store}>
        <div>
          {routes}
          <DevTools />
        </div>
      </Provider>,
      document.getElementById('app')
    );
  }
}

renderDOM()
