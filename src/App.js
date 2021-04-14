import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Control from './components/Control.component';
import PopulationMonitor from './components/PopulationMonitor.component';
import { randomizeXY, randomizeVacStatus, randomizeMaskStatus } from './functions/random';
import Legend from './components/Legend.component';

class App extends React.Component {

  _updateSettings = (settings) => {
    this.prevWidth = this.state.width;
    this.prevHeight = this.state.height;

    this._reset();

    this.setState(settings);
    this.population_monitor._initPopulation();
    this._runAnimation();
  };

  _drawCanvas = () => {
    var canvas = document.getElementsByTagName('canvas')[0];
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      if (this.prevHeight != null && this.prevWidth != null) {
        ctx.clearRect(0, 0, this.prevWidth, this.prevHeight); // clear canvas
      }

      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillRect(0, 0, this.state.width, this.state.height);
      ctx.save();

      this.ctx = ctx;
      this.population_monitor._initPopulation();
      this._runAnimation();
    }
  }

  _runAnimation = () => {
    var that = this;
    that.timer = setInterval(function() {
      if(!that.calculating) {
        that.calculating = true;

        if(that.state.quarantine_mode) {
          that.population_monitor._checkInfected();
        }

        that.population_monitor._detectInfection();
        that.ctx.clearRect(0, 0, that.state.width, that.state.height);
        that.peopleMap.forEach((person, key, map) => {
          person.draw();
        });

        that.setState({ticker: that.state.ticker + 1});

        if(that.infectedSet.size == that.peopleMap.size) {
          // all infected, stop animation
          clearInterval(that.timer);
          that.setState({end_game: true});
        }

        that.calculating = false;
      }
    }, 100);
  }

  _updatePosMap = (prevPos, person) => {
    // delete previous position
    if(this.posMap.has(prevPos.x) && this.posMap.get(prevPos.x).has(prevPos.y) && this.posMap.get(prevPos.x).get(prevPos.y).has(person.id)) {
      this.posMap.get(prevPos.x).get(prevPos.y).delete(person.id);
    }

    if(!this.posMap.has(person.state.pos.x)) {
      this.posMap.set(person.state.pos.x, new Map());
    }

    if(!this.posMap.get(person.state.pos.x).has(person.state.pos.y)) {
      this.posMap.get(person.state.pos.x).set(person.state.pos.y, new Set());
    }

    if(!this.posMap.get(person.state.pos.x).get(person.state.pos.y).has(person.id)) {
      let set = this.posMap.get(person.state.pos.x).get(person.state.pos.y);
      set.add(person.id);
      this.posMap.get(person.state.pos.x).set(person.state.pos.y, set);
    }

  }

  _reset = () => {
    clearInterval(this.timer);
    this.ctx.clearRect(0,0,this.prevWidth, this.prevHeight);

    // data maps
    this.posMap = new Map();
    this.peopleMap = new Map();
    this.infectedSet = new Set();

    // work control
    this.calculating = false;

    // reset time
    this.setState({ticker: 0});
  }

  constructor(props) {
    super(props);
    this.state = {
        population: 50,
        width: 800,
        height: 600,
        vaccinated: 90,
        masked: 50,
        vaccine_success: 70,
        mask_success: 30,
        ticker: 0,  // time tracker
        end_game: false,
        quarantine_mode: true,
        incubation_period: 50,
        recovery_period: 50
    }

    this.safe_distance = 10;
    this.size = 5;
    this.infected_radius = 5;
    
    this.prevWidth = null;
    this.prevHeight = null;
    
    this.ctx = null;
    this.timer = null;

    // data maps
    this.posMap = new Map();
    this.peopleMap = new Map();
    this.infectedSet = new Set();

    // work control
    this.calculating = false;

    // monitor
    this.population_monitor = new PopulationMonitor(this);

  }

  componentDidMount() {
    this._drawCanvas();
  }

  render() {
    return (
      <Container fluid className="main-container">
        <Row>
          <Col sm={7}>
            <div className="screen">
            <canvas id="main" width={this.state.width} height={this.state.height}></canvas>
            </div>
          </Col>
          <Col sm={3}>
            <Control setCallback={this._updateSettings} defaultstate={this.state} />
          </Col>
          <Col sm={2}>
            <Legend time={this.state.ticker} endAnimation={this.state.end_game} />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default App;
