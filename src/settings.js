import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}//Removes elements from array by value

class Meal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: {
        meal: "Not Found",
        source: "Not Found",
        type: "Not Found",
        source: "Not Found",
        exclude: false
    } }
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
              type: result["meals"][0]["strCategory"],
              source:result["meals"][0]["strSource"]
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
                    type: result["meals"][0]["strCategory"],
                    source:result["meals"][0]["strSource"]
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
      case "Random":
        return 0;
      case "Beef":
        return 1;

      case "Breakfast":
        return 2;

      case "Chicken":
        return 3;

      case "Dessert":
        return 4;

      case "Goat":
        return 5;

      case "Lamb":
        return 6;

      case "Miscellaneous":
        return 7;

      case "Pasta":
        return 8;

      case "Pork":
        return 9;

      case "Seafood":
        return 10;

      case "Side":
        return 11;

      case "Starter":
        return 12;

      case "Vegan":
        return 13;

      case "Vegetarian":
        return 14;

      }

  }
  decryptMeal(meal) {
    switch (meal) {
      case 0:
        return "Random";
      case 1:
        return "Beef";

      case 2:
        return "Breakfast";

      case 3:
        return "Chicken";

      case 4:
        return "Dessert";

      case 5:
        return "Goat";

      case 6:
        return "Lamb";

      case 7:
        return "Miscellaneous";

      case 8:
        return "Pasta";

      case 9:
        return "Pork";

      case 10:
        return "Seafood";

      case 11:
        return "Side";

      case 12:
        return "Starter";

      case 13:
        return "Vegan";

      case 14:
        return "Vegetarian";

      }

  }
  shouldComponentUpdate(nextProps){
    if (nextProps.meal_info.show == false){return true}
    if(nextProps.meal_info.mealCode == 0 && nextProps.meal_info.show == false){return false}
    if(this.encryptMeal(this.state.data.type) != nextProps.meal_info.mealCode){
      this.getData(nextProps.meal_info.mealCode)
      return false
    }
    if(this.encryptMeal(this.state.data.type) != nextProps.meal_info.mealCode){
      this.getData(nextProps.meal_info.mealCode)
      return false
    }
    else {
      return true
    }
  }
  componentDidMount() {
    this.getData(this.props.meal_info.mealCode)
  }
  getData(code) {
    let api_message = null
    if(code == 0){
      if(this.props.meal_info.exclude.includes(true)){
        let menu = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        if(this.props.meal_info.exclude[0] == true){ //Remove meat
          removeA(menu,1)
          removeA(menu,3)
          removeA(menu,5)
          removeA(menu,6)
          removeA(menu,9)
        }
        if(this.props.meal_info.exclude[1] == true){ //Remove seafood
          removeA(menu,10)
        }
        if(this.props.meal_info.exclude[2] == true){ //Remove seafood
          removeA(menu,13)
          removeA(menu,14)
        }

        let item = menu[Math.floor(Math.random() * menu.length)]

        api_message = "https://www.themealdb.com/api/json/v1/1/filter.php?c=".concat(this.decryptMeal(item))
        this.sendReqWeird(api_message)
      }
      else {
        api_message = "https://www.themealdb.com/api/json/v1/1/random.php"
        this.sendReq(api_message)
      }
    }
    else {
      api_message = "https://www.themealdb.com/api/json/v1/1/filter.php?c=".concat(this.decryptMeal(code))
      this.sendReqWeird(api_message)
    }
  }
  render() {
    if (this.props.meal_info.show == true && this.state.data != null) {

      return (
        <div>
        <div class="card-body">
          <p>{this.state.data.type}</p>
          <p>{this.state.data.meal}</p>
        </div>
        <div class="card-footer">
        <div class="source">Source: {this.state.data.source}</div>
        </div>

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
      mealCode: this.props.day_info.meal_types[i-1], show: this.showMeal(i), exclude: this.props.day_info.exclude
    }

    return meal_info
  }
	render(){
    if (this.props.day_info.show_day == true) {
		return(
			<div class="col-sm-4" style={{"padding": 25 + "px"}}>
			<div class="card">
					<div class="card-header">
						<h4>{this.props.day}</h4>
          </div>

          <Meal meal_info={this.makeInfo(1)}/>
          <Meal meal_info={this.makeInfo(2)}/>
          <Meal meal_info={this.makeInfo(3)}/>
          <Meal meal_info={this.makeInfo(4)}/>


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
      </div>)
    this.menu2 = (<div class="col">
      <p>Exclude:(Random Only)</p>
      <div class="radio">
        <label><input type="checkbox" name="meat" onChange={this.handleChangeExclude(1)}/> Meat</label>
      </div>
      <div class="radio">
        <label><input type="checkbox" name="fish" onChange={this.handleChangeExclude(2)} /> Fish</label>
      </div>
      <div class="radio">
        <label><input type="checkbox" name="vege" onChange={this.handleChangeExclude(3)} /> Vegetarian</label>
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
      type4: 0,
      meat: true,
      fish: true,
      vege: true
    }
  }
  get_type_element(i,func) {
    return (<div class="row">
      <div>Meal {i}</div>
      <div class="col">
        <form>
          <select onChange={func}>
            <option>Random</option>
            <option>Beef</option>
            <option>Breakfast</option>
            <option>Chicken</option>
            <option>Dessert</option>
            <option>Goat</option>
            <option>Lamb</option>
            <option>Miscellaneous</option>
            <option>Pasta</option>
            <option>Pork</option>
            <option>Seafood</option>
            <option>Side</option>
            <option>Starter</option>
            <option>Vegan</option>
            <option>Vegetarian</option>
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
      case "Random":
        return 0;
      case "Beef":
        return 1;

      case "Breakfast":
        return 2;

      case "Chicken":
        return 3;

      case "Dessert":
        return 4;

      case "Goat":
        return 5;

      case "Lamb":
        return 6;

      case "Miscellaneous":
        return 7;

      case "Pasta":
        return 8;

      case "Pork":
        return 9;

      case "Seafood":
        return 10;

      case "Side":
        return 11;

      case "Starter":
        return 12;

      case "Vegan":
        return 13;

      case "Vegetarian":
        return 14;

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
  handleChangeExclude = (event,value) => {
    switch (value) {
      case 1:
        this.setState({meat:!this.state.meat})
        break;
      case 2:
        this.setState({meat:!this.state.fish})
        break;
      case 3:
        this.setState({meat:!this.state.vege})
        break;
    }
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
  makeExclude() {
    var excludeArray = []
    excludeArray.push(this.state.meat)
    excludeArray.push(this.state.fish)
    excludeArray.push(this.state.vege)
    return excludeArray;
  }
  makeInfo(i) {
    const day_info = { show_day: this.checkShow(i, this.state.days),
      show_meals: this.state.meals,
      meal_types: this.makeTypes(),
    exclude: this.makeExclude() }
    return day_info
  }
  render() {
    this.body = (
    <div style={{"padding": 25 + "px"}}>
      <div class="row">
      <Day day="Monday" day_info={this.makeInfo(1)} />
      <Day day="Tuesday" day_info={this.makeInfo(2)} />
      <Day day="Wednesday" day_info={this.makeInfo(3)} />
      <Day day="Thursday" day_info={this.makeInfo(4)} />
      <Day day="Friday" day_info={this.makeInfo(5)} />
      <Day day="Saturday" day_info={this.makeInfo(6)} />
      <Day day="Sunday" day_info={this.makeInfo(7)} />
      </div>
    </div>)
		return(
      <div class="else">
        {this.body}
        <div class="settings">
          <div class="row">
            {this.menu1}
            {this.menu3}
          </div>
        </div>

      </div>
		);
	}
}
