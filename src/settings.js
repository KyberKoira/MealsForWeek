import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Meal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { meal: null, source: null, type: null, show: true }
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
    switch (this.props.meal_info.mealCode) {
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
  render() {
    if (this.props.meal_info.show == false) {return null}
    else {
      return (
        <div class="card-body">
          <p>{this.state.type}</p>
          <p>{this.state.meal}</p>
        </div>
      )}
        
      }
    }

class Day extends React.Component{ //
	constructor(props){
		super(props)
  }
  showMeal(id) {
    if (id <= this.props.day_info.show_meals){ return true }
    else { return false }
  }
  makeInfo(i) {
    const meal_info = {
      mealCode: i, show: this.showMeal(i)
    }
    return meal_info
  }
	render(){
    if (this.props.day_info.show_day == true) {
		return(
			<div class="col-sm-4">
			<div class="card">
					<div class="card-header">
						<h4>{this.props.day}</h4>
          </div>

          <Meal meal_info={this.makeInfo(1)}/>
          <Meal meal_info={this.makeInfo(2)}/>
          <Meal meal_info={this.makeInfo(3)}/>
          <Meal meal_info={this.makeInfo(4)}/>

					<div class="card-footer">
						<div class="source">Source:</div>
					</div>
			</div>
			</div>
		);}
		else{return null;}
	}
}

export default class Settings extends React.Component{
	constructor(props){
    super(props);
    this.menu1 = (<div class="col">
        <label for="sel1">Days:</label>
        <form>
          <select onChange={this.handleChange}>
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
        <select onChange={this.handleChange_meals}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
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
    this.menu3 = (<div class="col">
      <p>Types:</p>
      
    </div>)
    this.state = {
      days: 1,
      meals: 1
    }
  }
  handleChange = (event) => {
    this.setState({days: event.target.value})
  }
  handleChange_meals = (event) => {
    this.setState({ meals: event.target.value })
  }
  checkShow(index, showValue) {
    if (index <= showValue) { return true }
    else { return false }
  }
  makeInfo(i) {
    const day_info = { show_day: this.checkShow(i, this.state.days), show_meals: this.state.meals }
    return day_info
  }
  render() {
    this.body = (<div class="row">
      <Day day="Monday" day_info={this.makeInfo(1)} />
      <Day day="Tuesday" day_info={this.makeInfo(2)} />
      <Day day="Wednesday" day_info={this.makeInfo(3)} />
      <Day day="Thursday" day_info={this.makeInfo(4)} />
      <Day day="Friday" day_info={this.makeInfo(5)} />
      <Day day="Saturday" day_info={this.makeInfo(6)} />
      <Day day="Sunday" day_info={this.makeInfo(7)} />
    </div>)
		return(
      <div>
        {this.body}
        <div class="row">
          {this.menu1}
          {this.menu3}
          {this.menu2}
        </div>
      </div>
		);
	}
}