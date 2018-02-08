import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/home'
import chart1 from './components/chart1'
import chart2 from './components/chart2'
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Route path="/" component={(props) => (
					<Home {...props}>
						<Switch>
							<Route path='/chart1' component={chart1}/>
							<Route path='/chart2' component={chart2}/>
						</Switch>
					</Home>
				)}/>
			</Router>
		)
	}
}

export default App;
