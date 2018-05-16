import * as React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import Transactions from './transactions';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Content from './components/content';

const App = () => (
  <div>
    <CssBaseline />
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          My Finances
        </Typography>
      </Toolbar>
    </AppBar>
    <Content>
      <Transactions />
    </Content>
  </div>
);

export default App;
