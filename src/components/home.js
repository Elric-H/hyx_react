/**
 *Created by HeYuXuan
 *on 2018/2/7
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from '../logo.svg';
import '../App.css';

class Home extends Component {
	render() {
		return (
			<div className="App">

				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">
						<Link to="/chart1">示意图1</Link>
						<Link to="/chart2">示意图2</Link>
					</h1>
				</header>
				<div className="App-intro">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Home;
