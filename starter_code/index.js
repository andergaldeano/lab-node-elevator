/* jshint esversion: 6 */

 const Elevator = require('./elevator.js');
 const Person = require('./person.js');

 let luisCarlos = new Person("Luis Carlos",  0, 4);
 let paolo = new Person("Paolo", 2, 9);
 let raquel  = new Person("Raquel",  5, 1);
 let ander = new Person("Ander",  7, 4);

 let elevator = new Elevator();

 elevator.start();
 elevator.call(paolo);
 elevator.call(raquel);
 elevator.call(ander);
