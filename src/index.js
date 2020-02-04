import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css'
import './index.css';

function action(){
	return 'swag';
}

class Header extends React.Component{ //
	render(){
		return(
			<div class="jumbotron">
				<h1>Menu generator</h1>
				<p>Make your custom menu!</p>
			</div>
		);
	}
}

class Day extends React.Component{ //
	render(){
		return(
			<div class="col-sm-4">
					<h1>Day</h1>
					<p>Data</p>
			</div>
		);
	}
}

class Body extends React.Component{ //Containers for each day where data is input
	render(){
		return(
			<div class="row">
				<Day />
				<Day />
				<Day />
				<Day />
				<Day />
				<Day />
				<Day />
			</div>
		);
	}
}

class Settings extends React.Component{
	render(){
		return(
			<div>
			<h1> Settings </h1>
			<p>Number of days</p>
			<p>Meal Preferences</p>
			</div>
		);
	}
}

class Footer extends React.Component{
	render(){
		return(
			<h1> Footer </h1>
		);
	}
}

class App extends React.Component {
	render(){
    	return (
	    	<div class="container">
	    		<Header />
	    		<Body />
	    		<Settings />
	    		<button onClick={action}>Generate</button>
	    		<Footer />
	    	</div>
    	);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));