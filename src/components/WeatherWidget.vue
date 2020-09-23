<template>
  <div class="weather-block">
    <div class="weather-block__content" v-if="!loading">
      <div class="weather-block__forecast forecast">
        <div class="forecast__weather-type">
          <img class="forecast__weather-img" :src="'http://openweathermap.org/img/wn/' + getWeather().weather[0].icon + '.png'" alt="">
          <p class="forecast__type-name" v-text="getWeather().weather && getWeather().weather.length > 0 ? capitalizeFirstLetter(getWeather().weather[0].description) : 'Неизвестно'"></p>
        </div>
        <div class="forecast__today-forecast">
          <h3 class="forecast__title" v-text="title"></h3>
          <div class="forecast__time-forecast">
            <div class="forecast__text" v-for="(forecast, index) in getForecast()" :key="index">
              <p class="forecast__time" v-text="forecast.dt_txt.slice(10,)"></p>
              <div class="forecast__temp">
                <img class="forecast__forecast-img" :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'" alt="">
                <!-- <p class="forecast__temp-text" v-text="forecast.weather[0].description"></p> -->
                <p class="forecast__temp-text" v-text="forecast.main.temp + ' °'"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weather-block__city-weather city-weather">
        <div class="city-weather__header">
          <div class="city-weather__choose-city">
            <!-- <input class="city-weather__search" placeholder="Search" v-model="city"> -->
            <div class="city-weather__choose-btn">
              <button class="city-weather__city-btn" v-for="(city, index) in cities" :key="index" v-text="city.name" @click="clickedCity(city.engName)"></button>
            </div>
          </div>
          <div class="city-weather__current-city">
            <h1 class="city-weather__city" v-text="getCity().name"></h1>
            <h3 class="city-weather__country" v-text="getCity().country = 'KZ' ? 'Казахстан' : getCity().country"></h3>
          </div>
        </div>
        <div class="city-weather__footer">
          <div class="city-weather__time">
            <p class="city-weather__current-time" v-text="'Updated at: ' + convertTime"></p>
            <p class="city-weather__date" v-text="convertDate"></p>
          </div>
          <p class="city-weather__temp" v-text="getWeather().main.temp + ' °'"></p>
        </div>
      </div>
    </div>
    <div class="weather-block__loading" v-else>
      <div class="weather-block__spinner"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "HelloWorld",
  data () {
    return {
      title: 'Сегодня',
      loading: false,
      cities: [
        {
          id: 1,
          engName: 'Astana',
          name: 'Астана'
        },
        {
          id: 1,
          engName: 'Almaty',
          name: 'Алматы'
        }
      ],
      city: ''
    }
  },
  computed: {
    convertDate() {
      const date = new Date(this.getWeather().dt * 1000);
      return date.toLocaleString().slice(0, 10);
    },
    convertTime() {
      const date = new Date(this.getWeather().dt * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      return hours + ':' + minutes.substr(-2);
    }
  },
  mounted: function() {
    this.cityWeatherData()
    this.weatherForecast().finally(()=> (this.loading = false))

    setInterval(() => {
      this.weatherForecast()
    }, 600000)
  },
  methods: {
    ...mapActions({
      weatherForecast: 'getForecast',
      cityWeatherData: 'getWeather',
      chooseCityForecast: 'chooseCityForecast',
      chooseCityWeather: 'chooseCityWeather'
    }),
    ...mapGetters({
      getForecast: 'getForecast',
      getCity: 'getCity',
      getWeather: 'getWeather',
    }),
    clickedCity(city) {
      this.chooseCityForecast(city)
      this.chooseCityWeather(city)
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped lang="scss">
  .weather-block {
    width: 960px;
    height: 580px;

    background-image: url("../assets/img/test2.jpg");
    background-repeat: no-repeat;
    background-size: 960px;
    object-fit: cover;
    border-radius: 10px;

    &__content {
      width: 100%;
      height: 100%;
      display: flex;
    }
    &__spinner {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      background-color: transparent;
      border: 4px solid #222;
      border-top-color: #009688;
      -webkit-animation: 1s spin linear infinite;
      animation: 1s spin linear infinite;
    }
    & .forecast {
      width: 35%;
      height: 100%;
      padding: 2.5rem 2.5rem;
      background: rgba(rgb(219, 218, 218), .9);
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__weather-type {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      &__weather-img {
        width: 60%;
        object-fit: cover;
      }
      &__type-name {
        font-size: 1em;
        color: #4F4F4F;
      }

      &__today-forecast {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      } 
      &__title {
        font-size: 1em;
        font-weight: 600;
        justify-self: flex-start;
        align-self: flex-start;
        margin-bottom: 2em;
        color: #5C5C5C;
      }
      &__time-forecast {
        width: 100%;
        height: 100%;
      }
      &__text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .9em;
        color: #4F4F4F;
        margin-bottom: 1.5em;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #c2c2c2;
        }
        &:last-child {
          margin-bottom: 0;

          &::after {
            display: none;
          }
        }
      }
      &__temp {
        display: flex;
        align-items: center;
      }
      &__forecast-img {
        width: 30px;
        height: 27px;
      }
      &__temp-text {
          max-width: 4rem;
          width: 3rem;
          text-align: end;
      }
    }
    & .city-weather {
      width: 65%;
      height: 100%;
      padding: 2.5rem 2.5rem;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__header {
        display: flex;
        justify-content: space-between;
      }
      &__choose-city {
        
      }
      &__search {
        border: 0;
        width: 95%;
        height: 32px;
        border-radius: 14px;
        outline: none;
        cursor: pointer;
        margin-bottom: 1.5em;
        padding-left: 10px;
        font-size: 1em;
        box-sizing: border-box;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          background-image: url('../assets/img/loupe.png');
          background-size: 100%;
          width: 30px;
          height: 30px;
        }
      }
      &__city-btn {
        border: 0;
        padding: 8px 20px;
        border-radius: 14px;
        outline: none;
        cursor: pointer;
        margin-right: 1.5em;
        background-color: #303054;
        color: #d6d5d5;
        transition: 0.2s ease;

        &:hover {
          transform: scale(1.02);
          box-shadow: 3px 3px 2px 0px rgba(0,0,0,0.75);
        }
        &:last-child {
          margin-right: 0;
        }
      }
      &__city {
        font-size: 3em;
        color: white;
        font-weight: 500;
      }
      &__country {
        text-align: end;
        font-size: 1.1em;
        color: white;
        font-weight: 500;
      }
      &__footer {
        display: flex;
        justify-content: space-between;
      }
      &__time {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: white;
        font-size: 1.5em;
      }
      &__temp {
        font-size: 5em;
        color: white;
      }
    }
  }
</style>
