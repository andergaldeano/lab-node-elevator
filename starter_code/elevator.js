/* jshint esversion: 6 */

class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.direction  = "up";
    this.idInterval = 0;
    this.waitingList = [];
    this.passengers= [];
    }

  start() { this.idInterval = setInterval(()=>{this.update();}, 1000); }

  stop() { clearInterval(this.idInterval);}

  update() {
    this._passengersEnter();
    this._passengersLeave();
    this.moveElevator(this.direction);
    this.log();}

  moveElevator(directionPased){
    let requests = this.requests;
    let direction = directionPased;

    if( this.direction == "up" && requests[0] > this.floor){
      this.floorUp();
      console.log("going up");
    }
    else if(this.direction == "up" && requests[0] < this.floor){
      this.direction = "down";
      console.log("changeing direction");
    }
    else if(this.direction == "down" && requests[0] > this.floor){
      this.direction = "up";
      console.log("changeing direction");
    }
    else if(this.direction == "down" && requests[0] < this.floor){
      this.floorDown();
      console.log("going down");
    }
    else if (this.floor == requests[0]){
      this.requests.splice(0, 1);
    }


  }

  _passengersEnter() {if (this.waitingList.length > 0){
      this.waitingList.forEach((guy, index)=>{
       if(guy.originFloor == this.floor){
         console.log(`${guy.name} has enter the elevator`);
         this.passengers.push(guy);
         this.waitingList.splice(index, 1);
       }
     });
    } }

  _passengersLeave() {  if(this.passengers.length > 0 ){
          this.passengers.forEach((guy, index)=>{
           if(guy.destinationFloor == this.floor){
             console.log(`${guy.name} has left the elevator`);
             this.passengers.splice(index, 1);

             if(this.passengers.length == 0 && this.waitingList.length == 0){
               this.stop();
             }

           }
         });
        }
  }


  floorUp() { if (this.floor < this.MAXFLOOR){ this.floor++;}}

  floorDown() {if(this.floor > 0){this.floor--; }}

  call(who) { this.requests.push(who.originFloor, who.destinationFloor);
    this.waitingList.push(who);
    console.log(`${who.name} call the elevator`);

   }

  log() {
    console.log(`Direction : ${this.direction} | Floor: ${this.floor}`); }
  }


module.exports = Elevator;
