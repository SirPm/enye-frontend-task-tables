import React from 'react';

import TableOverview from './component/table-overview/TableOverview';

function App() {
  return (
    <div className="App">
      <h2 className="table-h2">Table showing list of users, their location, details and payment method</h2>
      <TableOverview />
    </div>
  );
}

export default App;
