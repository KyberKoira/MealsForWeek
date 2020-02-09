import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Meal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { meal: null, source: null, type: null, show: null }
  }
  getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  sendReq(api_message) {
    fetch(api_message)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({

            meal: result["meals"][0]["strMeal"],
            source: result["meals"][0]["strSource"],
            type: result["meals"][0]["strCategory"]
          });
        },
        (error) => {
          this.setState({
            meal: "Not Found",
            source: "Not Found",
            type: "Not Found"
          });
        }
      )
  }
  sendReqWeird(api_message) {
    var id = 0
    fetch(api_message)
      .then(res => res.json())
      .then(
        (result) => {
          id = result["meals"][this.getRndInteger(0, result["meals"].length - 1)]["idMeal"]
          console.log(id)
          fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=".concat(id.toString()))
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({

                  meal: result["meals"][0]["strMeal"],
                  source: result["meals"][0]["strSource"],
                  type: result["meals"][0]["strCategory"]
                });
              },
              (error) => {
                this.setState({
                  meal: "Not Found",
                  source: "Not Found",
                  type: "Not Found"
                });
              }
            )
        }
      )
  }
  componentDidMount() {
    let api_message = null
    switch (this.props.mealCode) {
      case 0: //Full Random
        api_message = "https://www.themealdb.com/api/json/v1/1/random.php"
        this.sendReq(api_message)
        break;
      case 1: //Random Breakfast
        api_message = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast"
        this.sendReqWeird(api_message)
        break;
      case 2: //Random Lunch
        api_message = "https://www.themealdb.com/api/json/v1/1/random.php"
        this.sendReq(api_message)
        break;
      case 3: //Vegetarian Lunch
        api_message = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
        this.sendReqWeird(api_message)
        break;
      case 4: //Random side
        api_message = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Side"
        this.sendReqWeird(api_message)
        break;

    }
  }
  render(){
        return (
          <div class="card-body">
            <p>{this.state.type}</p>
            <p>{this.state.meal}</p>
          </div>
        )
      }
    }

class Day extends React.Component{ //
	constructor(props){
		super(props)
	}
	render(){
		if (this.props.show == true){
		return(
			<div class="col-sm-4">
			<div class="card">
					<div class="card-header">
						<h4>{this.props.day}</h4>
          </div>

          <Meal mealCode={1}/>
          <Meal mealCode={1}/>
          <Meal mealCode={1}/>
          <Meal mealCode={1}/>

					<div class="card-footer">
						<div class="source">Source:</div>
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
    this.menu1 = (<div class="col">
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

      <label for="sel1">Meals per day:</label>
      <form>
        <select value={this.state.meals} onChange={this.handleChange_meals}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
        </select>
      </form>

      <form>
        <p>Energy goal per day(kcal):</p>
        <input type="text"/>
      </form>
      </div>)
    this.menu2 = (<div class="col">
      <p>Exclude:</p>
      <div class="radio">
        <label><input type="radio" name="optradio" value="Option 1" /> Meat</label>
      </div>
      <div class="radio">
        <label><input type="radio" name="optradio" value="Option 2" /> Fish</label>
      </div>
    </div>)
	}
	handleChange = (event) => {
		this.setState({days: event.target.value})
	}
	render(){
		return(
      <div>
        <Body days={this.state.days} />
        <div class="row">
        {this.menu1}
        {this.menu2}
        </div>
      </div>
		);
	}
}