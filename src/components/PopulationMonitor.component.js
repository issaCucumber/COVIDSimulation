import Person from './Person.component';
import { generate_pos_density } from '../functions/draw';
import { is_infected, is_quarantined, is_recovered } from '../functions/common';
import { randomizeVacStatus, randomizeMaskStatus } from '../functions/random';

class PopulationMonitor {

    constructor(app) {
        this.app = app;
    }

    _initPopulation = () => {
        var grids = generate_pos_density(this.app.state.population, this.app.state.width, this.app.state.height, this.app.safe_distance);
  
        for(var i = 0; i < grids.length; i++){
          var vaccinated = randomizeVacStatus(this.app.state.vaccinated);
          var masked = randomizeMaskStatus(this.app.state.masked);
          var person = new Person(""+i, 
                                  vaccinated, 
                                  masked, 
                                  grids[i], 
                                  this.app.state.width, 
                                  this.app.state.height, 
                                  this.app.size, 
                                  this.app.safe_distance, 
                                  this.app._updatePosMap);
  
          if(!vaccinated && this.app.infectedSet.size == 0) {
            person.setInfected(true, 0);
            this.app.infectedSet.add(person.id);
          }
  
          person.draw();
          this.app.peopleMap.set(person.id, person);
        }
    }
  
    _checkInfected= () => {
      var that = this.app;
  
      that.infectedSet.forEach((infectedId) => {
        let infected = that.peopleMap.get(infectedId);
        infected.setQuarantine(is_quarantined(infected, that.state.ticker, that.state.incubation_period), that.state.ticker);
        infected.setRecovered(is_recovered(infected, that.state.ticker, that.state.recovery_period));
  
        that.peopleMap.set(infectedId, infected);
  
        if(!infected.state.infected) {
          that.infectedSet.delete(infectedId);
        }
      });
    };
  
    _detectInfection = () => {
      let that = this.app;
      that.infectedSet.forEach((infectedId) => {
        let infected = that.peopleMap.get(infectedId);
  
        if(infected.quarantined) {
          return;
        }
  
        let i = infected.state.pos.x - that.infected_radius - that.size;
        let maxX = infected.state.pos.x + that.infected_radius + that.size;
        while(i < maxX) {
          if(i < 0 || i >= that.state.width) {
            i++;
            continue;
          }
          
          let xrange = that.posMap.get(i);
  
          if(xrange == undefined) {
            i++;
            continue;
          }
  
          let j = infected.state.pos.y - that.infected_radius - that.size;
          let maxY = infected.state.pos.y + that.infected_radius + that.size;
          while(j < maxY) {
            if(j < 0 || j >= that.state.height) {
              j++;
              continue;
            }
  
            let peopleInRange = xrange.get(j);
            if(peopleInRange == undefined) {
              j++;
              continue;
            }
  
            peopleInRange.forEach((personId) => {
              if(that.infectedSet.has(personId)) {
                return;
              }
  
              let person = that.peopleMap.get(personId);
              person.setInfected(
                is_infected(
                  infected, 
                  person, 
                  that.state.vaccine_success, 
                  that.state.mask_success),
                that.state.ticker);
              that.peopleMap.set(personId, person);
  
              if(person.state.infected) {
                that.infectedSet.add(person.id);
              }
            });
  
            j++;
          }
  
          i++;
          
        }
      });
    }
}

export default PopulationMonitor;