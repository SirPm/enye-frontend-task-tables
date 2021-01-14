import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TableOverview from './component/table-overview/TableOverview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={TableOverview} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
