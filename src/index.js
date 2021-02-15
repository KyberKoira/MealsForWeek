import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Settings from './settings.js'

class Header extends React.Component{
	render(){
		return(
			<div class="jumbotron">
				<h1>Menu generator</h1>
				<p>Make your custom menu!</p>
			</div>
		);
	}
}

class Footer extends React.Component{
	render(){
		return(
			<div class="footer" >
			<p style={{"font-size": 13 + "px"}}> Made by Joel Stening</p>
			</div>
		);
	}
}

class App extends React.Component {
	render(){
    	return (
	    	<div class="container">
	    		<Header />
	    		<Settings />
	    		<Footer />
	    	</div>
    	);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
