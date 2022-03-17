'use strict';


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


// let map, mapEvent;

class App {
  #map
  #mapEvent

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this))
  
  
    // change form type according to workout TYPE
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
  }

  _getPosition(){
    if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
        alert('Could not get your position');
      }
    );
  

  }

  _loadMap(position) {
      const {latitude} = position.coords
      const {longitude} = position.coords
      const coords = [latitude, longitude]
      
      console.log(this);
      this.#map = L.map('map').setView(coords, 14);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.#map);

      
      // handlings click on map
      this.#map.on("click", this._showForm.bind(this))    

    
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();  

  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden")

  }

  _newWorkout(e) {
    e.preventDefault()
    ;
      // clear input
      inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ""
      
      // display marker
    
          const {lat, lng} = this.#mapEvent.latlng
          console.log(lat, lng);        
          const coord = [lat, lng]
          L.marker(coord)
            .addTo(this.#map)
            .bindPopup(
              L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: "running-popup",
              })
            )
            .setPopupContent("Workout")
            .openPopup();
    }
  }

const app = new App();
// app._getPosition();

  