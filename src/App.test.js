// import { render, screen } from '@testing-library/react';
// import App from './App';
import Person from './components/Person.component';
import { generate_pos_density, find_quadrant, is_infected, is_quarantined, is_recovered } from './functions/common';

// test('fill up the area: 1', () => {
//   var pos = generate_pos_density(1, 10, 10, 10);
//   console.log(pos);
//   expect(pos.length).toEqual(1);
// });

// test('fill up the area: 2', () => {
//   var pos = generate_pos_density(1, 100, 100, 10);
//   console.log(pos);
//   expect(pos.length).toEqual(1);
//   expect(pos[0].x).toBeLessThan(100);
//   expect(pos[0].y).toBeLessThan(100);
// });

// test('fill up the area: 2.1', () => {
//   var pos = generate_pos_density(1, 100, 100, 10);
//   console.log(pos);
//   expect(pos.length).toEqual(1);
//   expect(pos[0].x).toBeLessThan(100);
//   expect(pos[0].y).toBeLessThan(100);
// });

// test('fill up the area: 2.2', () => {
//   var pos = generate_pos_density(1, 100, 100, 10);
//   console.log(pos);
//   expect(pos.length).toEqual(1);
//   expect(pos[0].x).toBeLessThan(100);
//   expect(pos[0].y).toBeLessThan(100);
// });

// test('fill up the area: 3', () => {
//   var pos = generate_pos_density(10, 100, 100, 10);
//   console.log(pos);
//   expect(pos.length).toEqual(10);
// });

// test('fill up the area: 4', () => {
//   var pos = generate_pos_density(10000, 100, 100, 10);
//   console.log(pos.length);
//   expect(pos.length).toEqual(10000);
// });

// test('find quadrant: 1.1', () => {
//   var pt1 = {x: 0, y: 2};
//   var pt2 = {x: 1, y: 4};

//   expect(find_quadrant(pt1.x, pt1.y, 10)).toEqual(find_quadrant(pt2.x, pt2.y, 10));
// });

// test('find quadrant: 1.2', () => {
//   var pt1 = {x: 7, y: 8};
//   var pt2 = {x: 9, y: 9};

//   expect(find_quadrant(pt1.x, pt1.y, 10)).toEqual(find_quadrant(pt2.x, pt2.y, 10));
// });

// test('find quadrant: 1.3', () => {
//   var pt1 = {x: 8, y: 0};
//   var pt2 = {x: 6, y: 1};

//   expect(find_quadrant(pt1.x, pt1.y, 10)).toEqual(find_quadrant(pt2.x, pt2.y, 10));
// });

// test('find quadrant: 1.4', () => {
//   var pt1 = {x: 5, y: 5};
//   var pt2 = {x: 9, y: 9};

//   expect(find_quadrant(pt1.x, pt1.y, 10)).toEqual(find_quadrant(pt2.x, pt2.y, 10));
// });

// test('find quadrant: 1.5', () => {
//   var pt1 = {x: 13, y: 15};
//   var pt2 = {x: 23, y: 25};

//   expect(find_quadrant(pt1.x, pt1.y, 10)).not.toBe(find_quadrant(pt2.x, pt2.y, 10));
// });

// test('find quadrant: 2.1', () => {
//   var pt1 = {x: 0, y: 2};
//   expect(find_quadrant(pt1.x, pt1.y, 10)).toEqual("0_0");
// });

// test('find quadrant: 2.2', () => {
//   var pt1 = {x: 5, y: 6};
//   expect(find_quadrant(pt1.x, pt1.y, 10)).toEqual("5_5");
// });

// test('infected: 1.1', () => {
//   var infected = new Person("1", false, false, {x: 0, y:0}, 0, 0, 5, 10, function(){});
//   infected.setInfected(true, 1);
//   var contacted = new Person("1", true, true, {x: 0, y:0}, 0, 0, 5, 10, function(){});
//   expect(is_infected(infected, contacted, 90, 30)).toEqual(true);
// });

// test('infected: 1.2', () => {
//   var infected = new Person("1", false, false, {x: 0, y:0}, 0, 0, 5, 10, function(){});
//   infected.setInfected(true, 1);
//   var contacted = new Person("1", true, true, {x: 0, y:0}, 0, 0, 5, 10, function(){});
  
//   expect(is_infected(infected, contacted, 90, 30)).toEqual(true);
// });

// test('infected: 1.3', () => {
//   var infected = new Person("1", false, false, {x: 0, y:0}, 0, 0, 5, 10, function(){});
//   infected.setInfected(true, 1);
//   var contacted = new Person("1", true, true, {x: 0, y:0}, 0, 0, 5, 10, function(){});

//   expect(is_infected(infected, contacted, 90, 30)).toEqual(true);
// });

// test('infected: 1.4', () => {
//   var infected = new Person("1", false, false, {x: 0, y:0}, 0, 0, 5, 10, function(){});
//   infected.setInfected(true, 1);
//   var contacted = new Person("1", true, true, {x: 0, y:0}, 0, 0, 5, 10, function(){});

//   expect(is_infected(infected, contacted, 90, 30)).toEqual(true);
// });

test('quarantine', () => {
    var infected = new Person("1", false, false, {x: 0, y:0}, 0, 0, 5, 10, function(){});
    infected.setInfected(true, 1);

    expect(is_quarantined(infected, 3, 2)).toEqual(true);
    expect(is_quarantined(infected, 10, 12)).toEqual(false);
    expect(is_quarantined(infected, 2, 10)).toEqual(false);
});

test('recovery', () => {
  var infected = new Person("1", false, false, {x: 0, y:0}, 0, 0, 5, 10, function(){});
  infected.setInfected(true, 1);
  infected.setQuarantine(true, 2);

  expect(is_recovered(infected, 5, 2)).toEqual(true);
  expect(is_recovered(infected, 10, 12)).toEqual(false);
  expect(is_recovered(infected, 2, 10)).toEqual(false);
});

