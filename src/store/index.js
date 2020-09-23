import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weather: [],
    forecast: [],
    city: []
  },
  getters: {
    getForecast: state => state.forecast,
    getCity: state => state.city,
    getWeather: state => state.weather
  },
  mutations: {
    setWeather (state, weather){
      state.weather = weather
    },
    setCity (state, city){
      state.city = city
    },
    setForecast (state, forecast){
      state.forecast = forecast
    },
  },
  actions: {
    getForecast({commit}){
      return new Promise( resolve => {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=almaty&appid=5c90fd52805a6f245f7f91b6e7d6a982&units=metric&lang=ru', {
          method: "GET"
        })
          .then(res => res.json())
          .then(response => {
            commit('setWeather', response)
            resolve(response)
          })
          .catch(err => {
            console.log(err);
          })
      })
    },
    getWeather({commit}){
      return new Promise( resolve => {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=Almaty&appid=5c90fd52805a6f245f7f91b6e7d6a982&units=metric&lang=ru&cnt=5', {
          method: "GET"
        })
          .then(res => res.json())
          .then(response => {
            commit('setCity', response.city)
            commit('setForecast', response.list)
            resolve(response)
          })
          .catch(err => {
            console.log(err);
          })
      })
    },
    chooseCityForecast({commit}, city){
      return new Promise( resolve => {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=5c90fd52805a6f245f7f91b6e7d6a982&units=metric&lang=ru&cnt=5', {
          method: "GET"
        })
          .then(res => res.json())
          .then(response => {
            console.log('YAHOOO')
            commit('setCity', response.city)
            commit('setForecast', response.list)
            resolve(response)
          })
          .catch(err => {
            console.log(err);
          })
      })
    },
    chooseCityWeather({commit}, city){
      return new Promise( resolve => {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=5c90fd52805a6f245f7f91b6e7d6a982&units=metric&lang=ru&', {
          method: "GET"
        })
          .then(res => res.json())
          .then(response => {
            commit('setWeather', response)
            resolve(response)
          })
          .catch(err => {
            console.log(err);
          })
      })
    },
  },
  modules: {}
});
