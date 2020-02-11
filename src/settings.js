import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Meal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null }

  }

  getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  sendReq(api_message) {
    fetch(api_message)
      .then(res => res.json())
      .then(
        (result) => {

          this.state.data = {
              meal: result["meals"][0]["strMeal"],
              source: result["meals"][0]["strSource"],
              type: result["meals"][0]["strCategory"]
          }
          console.log(this.state.data)
          this.forceUpdate()


        },
        (error) => {
          this.setState({
            data: {
              meal: "Not Found",
              source: "Not Found",
              type: "Not Found"
            }

          }
        );
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
                this.state.data = {
                    meal: result["meals"][0]["strMeal"],
                    source: result["meals"][0]["strSource"],
                    type: result["meals"][0]["strCategory"]
                }
                this.forceUpdate()

              },
              (error) => {
                this.setState({
                  data: {
                    meal: "Not Found",
                    source: "Not Found",
                    type: "Not Found"
                  }

                }
                );
              }
            )
        }
      )
  }
  encryptMeal(meal) {
    switch (meal) {
      case "Breakfast":
        return 1;

      case "Lunch":
        return 2;

      case "Vegetarian":
        return 3;

      case "Side":
        return 4;

      default:
        return 0;
}

  }
  shouldComponentUpdate(nextProps){
    if (this.props.meal_info.show == false){return false}
    console.log(nextProps.meal_info.mealCode)
    console.log(this.encryptMeal(this.state.data.type))
    console.log(this.props.meal_info.mealCode)
    if(nextProps.meal_info.mealCode == 0){return false}
    if(this.encryptMeal(this.state.data.type) != nextProps.meal_info.mealCode){
      this.getData(nextProps.meal_info.mealCode)
      return false
    }
    else {
      return true
    }
  }
  componentDidMount() {
    this.getData(this.encryptMeal(this.props.meal_info.mealCode))
  }
  getData(code) {
    let api_message = null
    console.log(this.props.meal_info.mealCode)
    switch (code) {
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

    if (this.props.meal_info.show == true && this.state.data != null) {

      return (
        <div class="card-body">
          <p>{this.state.data.type}</p>
          <p>{this.state.data.meal}</p>
        </div>
      )}
    else {
      return null
      }

  }
}

class Day extends React.Component{
	constructor(props){
    super(props)
    this.state = {update: true}
  }
  showMeal(id) {
    if (id <= this.props.day_info.show_meals){ return true }
    else { return false }
  }
  makeInfo(i) {
    const meal_info = {
      mealCode: this.props.day_info.meal_types[i-1], show: this.showMeal(i)
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
      <div class="radio">
        <label><input type="radio" name="optradio" value="Option 3" /> Vegetarian</label>
      </div>
    </div>)
    this.menu3 = (<div class="col">
      <p>Types:</p>
      {this.get_type_element(1, this.handleChange_meal_type1)}
      {this.get_type_element(2, this.handleChange_meal_type2)}
      {this.get_type_element(3, this.handleChange_meal_type3)}
      {this.get_type_element(4, this.handleChange_meal_type4)}
    </div>)
    this.state = {
      days: 1,
      meals: 1,
      type1: 0,
      type2: 0,
      type3: 0,
      type4: 0
    }
  }
  get_type_element(i,func) {
    return (<div class="row">
      <div>Meal {i}</div>
      <div class="col">
        <form>
          <select onChange={func}>
            <option>Random</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Vegetarian</option>
            <option>Side</option>
          </select>
        </form>
      </div>

    </div>)
  }
  handleChange = (event) => {
    this.setState({days: event.target.value})
  }
  handleChange_meals = (event) => {
    this.setState({ meals: event.target.value })
  }
  encryptMeal(meal) {
    switch (meal) {
      case "Breakfast":
        return 1;

      case "Lunch":
        return 2;

      case "Vegetarian":
        return 3;

      case "Side":
        return 4;
      default:
       return 0
      }


  }
  handleChange_meal_type1 = (event) => {
    this.setState({ type1: this.encryptMeal(event.target.value) })
  }
  handleChange_meal_type2 = (event) => {
    this.setState({ type2: this.encryptMeal(event.target.value) })
  }
  handleChange_meal_type3 = (event) => {
    this.setState({ type3: this.encryptMeal(event.target.value) })
  }
  handleChange_meal_type4 = (event) => {
    this.setState({ type4: this.encryptMeal(event.target.value) })
  }
  checkShow(index, showValue) {
    if (index <= showValue) { return true }
    else { return false }
  }
  makeTypes() {
    var typeArray = []
    typeArray.push(this.state.type1)
    typeArray.push(this.state.type2)
    typeArray.push(this.state.type3)
    typeArray.push(this.state.type4)
    return typeArray;
  }
  makeInfo(i) {
    const day_info = { show_day: this.checkShow(i, this.state.days), show_meals: this.state.meals, meal_types: this.makeTypes() }
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
