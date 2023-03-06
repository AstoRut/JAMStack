const key = "IYN24y22kEWV1w1ZL2Ym8wZKIzAP3jDh";
const API = `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${key}`;

function getStories(event) {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data));
}

function getItemText(item) {
  // using try and catch because some of the multimedia fields are blank
  try {
    let caption = item.media[0].caption;
    if (!caption) {
      caption = "No caption available";
    }
    let contents = `<div class="item">

      <figure>
        <picture>
          <img src="${item.media[0]["media-metadata"][1].url}" alt="" style="width:100%">
          <figcaption>${caption}</figcaption>
        </picture>
      </figure>

      <h3><a href="${item.url}">${item.title}</a></h3>
      <p>${item.abstract}</p>

     </div>`;
    return contents;
  } catch {
    console.log(`Missing field from ${item.title}`);
    return;
  }
}

function showData(stories) {
  let looped = "";
  looped = looped + stories.results.map(getItemText).join("");

  document.querySelector(".stories").innerHTML = looped;
}

if (document.querySelector(".home")) {
  getStories();
}
