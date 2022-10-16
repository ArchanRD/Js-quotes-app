let btn = document.getElementById('btn')
btn.addEventListener('click', ()=>{
    btn.classList.remove('glow-on-hover')
    btn.classList.add('btn')
})


let ins = document.getElementById("inst");
function fetchRandomQuote() {
  ins.style.display = "none";
  let random = Math.floor(Math.random() * 1000);

  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("randomquote").innerHTML =
        '"' + data[random].text + '"';
    });

  fetchRandomAuthors();
}
let randomAuthors = [];

function fetchRandomAuthors() {
  randomAuthors = [];
  let random = Math.floor(Math.random() * 1000);
  authorContainer.innerHTML = "";

  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      randomAuthors.push(data[random].author);
      randomAuthors.push(data[random - 1].author);
      randomAuthors.push(data[random - 3].author);
      randomAuthors.map((x) => {
        if (x != null) {
          let authorContainer = document.getElementById("authorContainer");
          let authorName = document.createElement("p");
          authorName.classList.add("authorName");
          authorContainer.appendChild(authorName);
          authorName.innerHTML = x;
          authorName.addEventListener("click", renderAuthorQuotes);
          authorName.addEventListener("click", fetchRandomAuthors);
        }
      });
    });
}

function renderAuthorQuotes(e) {
  let clickedAuthor = e.target.innerHTML;
  let QuoteContainer = document.getElementById("authorListContainer");
  QuoteContainer.innerHTML = "";

  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let requestedQuote = data
        .filter((x) => {
          return x.author == clickedAuthor;
        })
        .map((x) => {
          let quote = document.createElement("p");
          quote.classList.add("authorQuotes");
          QuoteContainer.appendChild(quote);
          quote.innerHTML = x.text;
        });
    });
}
