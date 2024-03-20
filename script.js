let pokemonContainer = document.querySelector('#pokemon-card-container');
let filterBtn = document.querySelector('#filter');

let searchInput = document.querySelector('#search');
let pokeType = document.querySelector('#type');
// console.log(pokeType);
// console.log(searchInput.value);
let colors = {
    grass: 'lightgreen',
    fire: '#ffc87c',
    water: '#87ceeb',
    bug:'#bc8f8f',
    normal:'#c4c3d0',
    electric:'#ffffe0',
    ground:'#987654 ',
    fairy:'#ffc0cb',
    fighting:'#ff6347',
    psychic:'#8fbc8f',
    rock:'grey',
    ghost:'#40e0d0',
    ice:'wheat',
    dragon:'#e8f48c',
    poison:'#e6e6fa'
}

let Dcolors = {
    grass: 'green',
    fire: 'orange',
    water: 'blue',
    bug:'brown',
    normal:'#f4f0ec',
    electric:'yellow',
    ground:'#6f4e37',
    fairy:'#ff69b4',
    fighting:'red',
    psychic:'#4d5d53',
    rock:'#555555',
    ghost:'#9370db',
    ice:'wheat',
    dragon:'#9dc209',
    poison:'purple'
}
async function fetchPokemon(i)
{
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    let result = await response.json();
    // console.log(result);
    return result;
}

async function createPokemoncard(details)
{
    let abilities =details.abilities.reduce(function(acc,curr,index){
        if(index==0)
        {
            return acc+curr.ability.name+' ';
        }
        return acc+', '+curr.ability.name;
    },"")
    
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class = 'card-inner'>

      <div class = 'card-front'>
        <div class = 'id'>${details.id}</div>
        <img  class='imageTag' src='${details.sprites.front_default}'>
        <div class= 'name'>${details.name}</div>
        <div class = 'type'>${details.types[0].type.name}</div>
      </div>

      <div class = 'card-back'>
        <img src='${details.sprites.back_default}'>
        <div class= 'name'>${details.name}</div>
        <div class = 'abilities'>${abilities}
      </div>

      </div>
    `

    card.querySelector('.card-inner').style.backgroundColor = colors[details.types[0].type.name];

    card.querySelector('.type').style.backgroundColor = Dcolors[details.types[0].type.name];

    card.querySelector('.id').style.backgroundColor = Dcolors[details.types[0].type.name];

    card.querySelector('.abilities').style.backgroundColor = Dcolors[details.types[0].type.name];

   

    pokemonContainer.appendChild(card);

    // return card;
}

searchInput.addEventListener('input',()=>{
    let allCards = document.querySelectorAll('.card');
    // console.log(allCards);
    let pokeArray = Array.from(allCards);
    // console.log(pokeArray);
    pokeArray.forEach((element)=>{
        let pokemonName = element.children[0].children[0].children[2].innerText;
        if(pokemonName.startsWith(searchInput.value))
        {
            element.style.display = 'block';
        }
        else
        {
            element.style.display = 'none';
        }
        // console.log(pokemonName)
    })
})

filterBtn.addEventListener('click',function(){
    let allCards = document.querySelectorAll('.card');
    console.log(allCards);
    let pokeArray = Array.from(allCards);
    console.log(pokeArray);
    pokeArray.forEach((element)=>{
        console.log(element);
         let pokemonType = element.children[0].children[0].children[3].innerText;
        //  console.log(pokemonType);
        if(pokemonType===type.value)
        {
            element.style.display = 'block';
        }
        else
        {
            element.style.display = 'none';
        }
    })
})
async function fetchmainpage()
{
    for(let i=1;i<=151;i++)
    {
        let pokemon = await fetchPokemon(i);
        // console.log(pokemon);

        let card = createPokemoncard(pokemon);
        // console.log(card)
        // pokemonContainer.append(card);
    }
    
}

fetchmainpage();