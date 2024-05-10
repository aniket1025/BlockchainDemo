import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import Dashboard from './Dashboard';
import TokenManagement from './TokenManagement';
import Transactions from './Transactions';
import Login from './Login'; // Import the Login component

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
    const [selectedRole, setSelectedRole] = useState(''); // State to store selected role

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/manage">Manage Tokens</Button>
                    <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/manage">
                    {isLoggedIn ? <TokenManagement /> : <Login onRoleSelect={handleRoleSelect} />}
                </Route>
                <Route path="/transactions">
                    {isLoggedIn ? <Transactions /> : <Login onRoleSelect={handleRoleSelect} />}
                </Route>
                <Route exact path="/">
                    {isLoggedIn ? <Dashboard /> : <Login onRoleSelect={handleRoleSelect} />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
