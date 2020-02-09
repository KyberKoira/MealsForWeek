import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Day extends React.Component{ //
	constructor(props){
		super(props)
		this.state= {meal: null, source: null}
	}
	componentDidMount(){
		fetch("https://www.themealdb.com/api/json/v1/1/random.php")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({

						meal: result["meals"][0]["strMeal"],
						source: result["meals"][0]["strSource"]
					});
				},
				(error) => {
					this.setState({
						meal: "Not Found",
						source: "Not Found"
					});
				}
			)
	}
	render(){
		if (this.props.show == true){
		return(
			<div class="col-sm-4">
			<div class="card">
					<div class="card-header">
						<h4>{this.props.day}</h4>
					</div>
					<div class="card-body">
						<p>{this.state.meal}</p>
					</div>
					<div class="card-footer">
						<div class="source">Source: {this.state.source}</div>
					</div>
			</div>
			</div>
		);}
		else{return null;}
	}
}

class Body extends React.Component{ //Containers for each day where data is input
	constructor(props){
		super(props);
	}

	checkShow(index,showValue){
		if (index <= showValue){return true}
		else{return false}
	}

	render(){
		console.log(this.props.days)
			return(
				<div class="row">
					<Day day="Monday" show={this.checkShow(1,this.props.days)}/>
					<Day day="Tuesday" show={this.checkShow(2,this.props.days)}/>
					<Day day="Wednesday" show={this.checkShow(3,this.props.days)}/>
					<Day day="Thursday" show={this.checkShow(4,this.props.days)}/>
					<Day day="Friday" show={this.checkShow(5,this.props.days)}/>
					<Day day="Saturday" show={this.checkShow(6,this.props.days)}/>
					<Day day="Sunday" show={this.checkShow(7,this.props.days)}/>
				</div>
		
		);
	}
}

export default class Settings extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			days: 1
		}
	}
	handleChange = (event) => {
		this.setState({days: event.target.value})
	}
	render(){
		return(
			<div>
			<Body days={this.state.days}/>
			<h3> Settings </h3>
				<label for="sel1">Days:</label>
				<form>
				<select value={this.state.days} onChange={this.handleChange}>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
				</select>
				</form>

			<p>Exclude:</p>
				<div class="radio">
					<label><input type="radio" name="optradio" value="Option 1" /> Meat</label>
				</div>
				<div class="radio">
					<label><input type="radio" name="optradio" value="Option 2" /> Fish</label>
				</div>
			<p>kcal tavoite</p>

			</div>
		);
	}
}