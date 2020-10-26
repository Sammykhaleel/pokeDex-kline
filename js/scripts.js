var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//maybe something wrong here
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  // function add(pokemon) {
  //   if (
  //     typeof pokemon === "object" &&
  //     "name" in pokemon &&
  //     "deatialsUrl" in pokemon 
  //   ) {
  //     pokemonList.push (pokemon);
  //   }
  // }

  function getAll() {
    return pokemonList;
  }
function addListItem (pokemon){
  //let ul=document.querySelector(".pokemonList");
  let ul=$('.pokemonList');
  //let li=document.createElement("li");
  let li=$('<li></li>');
  //let button=document.createElement('button');
  //button.innerText=pokemon.name;
  let button=$('<button>'+pokemon.name+'</button>');
  //li.appendChild(button);
  li.append(button);
  //ul.appendChild(li);
  ul.append(li);
  // button.addEventListener("click",function(event){
  //   showDetails(pokemon)
  // })
  button.on('click',function(event)
  {showDetails(pokemon)
  });
} 

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
    showModal(pokemon)
  });
}
function showModal(pokemon) {
  //var $modalContainer = document.querySelector("#modal-container");
  let $modalContainer = $('#modal-container');
  //clear existing content of the model
  //$modalContainer.innerHTML = "";
  $modalContainer.empty();
  //creating div element in DOM
  //var modal = document.createElement("div");
  let modal = $('<div class="modal"></div>');
  //adding class to div DOM element
  //modal.classList.add("modal");
  //creating closing button in modal content
  // var closeButtonElement = document.createElement("button");
  // closeButtonElement.classList.add("modal-close");
  // closeButtonElement.innerText = "Close";
  // 
  var closeButtonElement = $('<button class="modal-close">Close</button>');
    // adding event listener to close modal when clicked on button
    closeButtonElement.on("click", hideModal);
  //creating element for name in modal content
  // var nameElement = document.createElement("h1");
  // nameElement.innerText = pokemon.name;
  let nameElement = $('<h1>'+pokemon.name+'</h1>');
  // creating img in modal content
  // var imageElement = document.createElement("img");
  // imageElement.classList.add("modal-img");
  // imageElement.setAttribute("src", pokemon.imageUrl);
let imageElement = $('<img class="modal-img">');
imageElement.attr("src", pokemon.imageUrl);
  //creating element for height in modal content
  // var heightElement = document.createElement("p");
  // heightElement.innerText = "height : " + pokemon.height;
  let heightElement = $('<p>height :'+pokemon.height+'</p>');
  //creating element for weight in modal content
  // var weightElement = document.createElement("p");
  // weightElement.innerText = "weight : " + pokemon.weight;
  let weightElement = $('<p>weight :'+pokemon.weight+'</p>');
  //creating element for type in modal content
  // var typesElement = document.createElement("p");
  // typesElement.innerText = "types : " + pokemon.types;
  let typesElement = $('<p>types :'+pokemon.types+'</p>');
  //creating element for abilities in modal content
  // var abilitiesElement = document.createElement("p");
  // abilitiesElement.innerText = "abilities : " + pokemon.abilities;
  let abilitiesElement = $('<p>abilities:'+pokemon.abilities+'</p>');
  //appending modal content to webpage
  // modal.appendChild(closeButtonElement);
  modal.append(closeButtonElement);
  // modal.appendChild(nameElement);
  modal.append(nameElement);
  // modal.appendChild(imageElement);
  modal.append(imageElement);
  // modal.appendChild(heightElement);
  modal.append(heightElement)
  // modal.appendChild(weightElement);
  modal.append(weightElement);
  // modal.appendChild(typesElement);
  modal.append(typesElement);
  // modal.appendChild(abilitiesElement);
  modal.append(abilitiesElement)
  // $modalContainer.appendChild(modal);
  $modalContainer.append(modal);
  //adds class to show the modal
  // $modalContainer.classList.add("is-visible");
  $modalContainer.addClass("is-visible");
}
function hideModal() {
  let $modalContainer = $("#modal-container");
  $modalContainer.removeClass("is-visible");
}
//   var $modalContainer = document.querySelector("#modal-container");
//   $modalContainer.classList.remove("is-visible");
// }
//hides modal when clicked on ESC on keyboard
jQuery(window).on("keydown", e => {
  let $modalContainer = $("#modal-container");
  if (e.key === "Escape" && $modalContainer.hasClass("is-visable")) {
    hideModal();
  }
});
// window.addEventListener("keydown", (e) => {
//   var $modalContainer = document.querySelector("#modal-container");
//   if (
//     e.key === "Escape" &&
//     $modalContainer.classList.contains("is-visible")
//   ) {
//     hideModal();
//   }
// });
//hides modal if clicked outside of it
let $modalContainer = document.querySelector("#modal-container");
$modalContainer.addEventListener("click", (e) => {
  let target = e.target;
  if (target === $modalContainer) {
    hideModal();
  }
});
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.other.dream_world.front_default;
    item.height = details.height;
    item.weight = details.weight;
    item.types = [];
    details.types.forEach(function(itemtype){
      item.types.push(itemtype.type.name)
    })
    item.abilities = [];
    details.abilities.forEach(function(itemability){
      item.abilities.push(itemability.ability.name)
    })
  }).catch(function (e) {
    console.error(e);
  });
}
  return {
    loadList: loadList,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


