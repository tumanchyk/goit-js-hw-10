export async function fetchCountries(name){
 const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,languages,flags`)
 const data = response.json()
    return data
}
