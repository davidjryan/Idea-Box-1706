$('.save-button').on('click', cardCreation);
$('.main-container').on('click', '.card-delete-button', deleteCard);
$('.main-container').on('click', '.card-quality-up', upVote);
$('.main-container').on('click', '.card-quality-down', downVote);
$('.input-search').on('keyup', filterInput);

function IdeaCard(title, body) {
  this.title = title,
  this.body = body,
  this.quality = "Swill",
  this.id = Date.now()
}

function cardCreation(event) {
  event.preventDefault();
  var title = $('.input-title').val();
  var body = $('.input-body').val();
  var Idea = new IdeaCard(title, body)

  cardHTML(Idea)
  clearInputs();
}

function cardHTML(object) {
  $('.main-container').prepend(`<article>
    <input type="text" class="card-title" placeholder="Example Idea 1" value="${object.title}">
    <button class="card-delete-button"></button>
    <textarea class="card-body" name="" id="" cols="30" rows="3">${object.body}</textarea>
    <section class="card-quality-container">
      <button class="card-quality-up"></button>
      <button class="card-quality-down"></button>
      <p class="card-quality-text">quality: ${object.quality}</p>
    </section>
    <hr />
  </article>`)
}


function clearInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
}

function filterInput() {
  var searchInput = $(this).val();
  // if input is same as title or body below show that card-body
  // if input is different than a title or body below hide that card
  // if input is empty, all cards should be visible
  if (searchInput === IdeaCard.title || searchInput === IdeaCard.body){
    IdeaCard.style.display = "block";
  } else{
    IdeaCard.style.display = "none";
  }
}

function deleteCard() {
  $(this).closest('article').remove();
}

function downVote() {

}

function upVote() {

}

function localStorageInterface() {

}
