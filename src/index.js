import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { makeMarkupList, makeMarkupItem } from './markUp';

const countryListEl = document.querySelector('.country-list')
const countryInfoEl = document.querySelector('.country-info')
const inputSearch = document.getElementById('search-box')
const DEBOUNCE_DELAY = 300;
inputSearch.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY) )

function findCountry(e){
    e.preventDefault()
    const inputValue = e.target.value.trim()    
    fetchCountries(inputValue).then(value =>{
        console.log(value)
         
        if(!value.length) throw new Error(error)
        filterCountry(value)
    }).catch(onError)
}




function filterCountry(obj){
    const n = obj.length
    if(n > 10){
        cleanSpace()
        Notify.info('Too many matches found. Please enter a more specific name')
    } else if(n === 1){
        cleanSpace()
       const countryCard =  makeMarkupItem(obj)
        countryInfoEl.innerHTML = countryCard
    } else if(n < 10 && n > 1){
        cleanSpace()
     const countryList = makeMarkupList(obj)     
     countryListEl.innerHTML = countryList
    }
}

function cleanSpace(){
    countryInfoEl.innerHTML = ''
    countryListEl.innerHTML = ''
}
function onError(){
    cleanSpace()
    Notify.failure('Oops, there is no country with that name')
}