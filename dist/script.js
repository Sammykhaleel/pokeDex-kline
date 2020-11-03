var pokemonRepository = (function () {
  var t = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(e) {
    t.push(e);
  }
  function i(t) {
    let e = $(".modal-body"),
      n = $(".modal-title");
    e.empty(), n.empty();
    $(".modal-header");
    let i = $("<h1>" + t.name + "</h1>"),
      a = $('<img class="modal-img" style="width:50%">');
    a.attr("src", t.imageUrl);
    let o = $('<img class="modal-img" style="width:40%">');
    o.attr("src", t.imageUrlAnimated);
    let l = $("<p>height : " + t.height + "</p>"),
      r = $("<p>weight : " + t.weight + "</p>"),
      s = $("<p>types : " + t.types + "</p>"),
      d = $("<p>abilities : " + t.abilities + "</p>");
    n.append(i),
      e.append(a),
      e.append(o),
      e.append(l),
      e.append(r),
      e.append(s),
      e.append(d);
  }
  function a() {
    $("#modal-container").removeClass("is-visible");
  }
  jQuery(window).on("keydown", (t) => {
    let e = $("#modal-container");
    "Escape" === t.key && e.hasClass("is-visible") && a();
  });
  let o = document.querySelector("#modal-container");
  function l(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.other.dream_world.front_default),
          (t.imageUrlAnimated =
            e.sprites.versions["generation-v"][
              "black-white"
            ].animated.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []),
          e.types.forEach(function (e) {
            t.types.push(e.type.name);
          }),
          (t.abilities = []),
          e.abilities.forEach(function (e) {
            t.abilities.push(e.ability.name);
          });
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  return (
    o.addEventListener("click", (t) => {
      t.target === o && a();
    }),
    {
      loadList: function () {
        return fetch(e)
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              n({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      add: n,
      getAll: function () {
        return t;
      },
      addListItem: function (t) {
        pokemonRepository.loadDetails(t).then(function () {
          var e = $(".row"),
            n = $('<div class="card" style="width:400px"></div>'),
            a = $(
              '<img class="card-img-top" alt="Card image" style="width:20%" />'
            );
          a.attr("src", t.imageUrl);
          var o = $('<div class="card-body"></div>'),
            r = $("<h4 class='card-title' >" + t.name + "</h4>"),
            s = $(
              '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal">See Profile</button>'
            );
          e.append(n),
            n.append(a),
            n.append(o),
            o.append(r),
            o.append(s),
            s.on("click", function (e) {
              !(function (t) {
                l(t).then(function () {
                  console.log(t), i(t);
                });
              })(t);
            });
        });
      },
      loadDetails: l,
      showModal: i,
      hideModal: a,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
