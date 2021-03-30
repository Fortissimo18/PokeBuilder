import React from 'react';
import Layout from './containers/Layout/Layout';
import PokeBuilder from './containers/PokeBuilder/PokeBuilder';

function App() {
  return (
    <div>
      <Layout>
        <PokeBuilder />
      </Layout>
    </div>
  );
}

export default App;
