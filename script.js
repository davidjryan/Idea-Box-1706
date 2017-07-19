$('.save-button').on('click', cardCreation);
$('.main-container').on('click', '.card-delete-button', deleteCard);
$('.main-container').on('click', '.card-quality-up', upVote);
$('.main-container').on('click', '.card-quality-down', downVote);
$('.input-search').on('keyup', filterInput);
$('.main-container').on('keyup', '.card-title', editCardTitle);
$('.main-container').on('keyup', '.card-body', editCardBody);

$(document).ready(function() {
  for (var i = 0; i < localStorage.length; i++){
    var id = JSON.parse(localStorage.key(i));
    cardHTML(getStorage(id));
  }
})


function IdeaCard(title, body) {
  this.title = title,
  this.body = body,
  this.quality = "swill",
  this.id = Date.now()
}

function cardCreation(event) {
  event.preventDefault();
  var title = $('.input-title').val();
  var body = $('.input-body').val();
  var Idea = new IdeaCard(title, body);

  cardHTML(Idea)
  setStorage(Idea);
  clearInputs();
}

function cardHTML(object) {
  $('.main-container').prepend(`<article role="form" id="${object.id}">
    <input type="text" class="card-title" placeholder="Example Idea 1" value="${object.title}">
    <button class="card-delete-button"></button>
    <textarea class="card-body" name="" id="" cols="30" rows="3">${object.body}</textarea>
    <section class="card-quality-container">
      <button class="card-quality-up"></button>
      <button class="card-quality-down"></button><p class="card-quality-text">Quality: </p>
      <p class="card-quality-text">${object.quality}</p>
    </section>
    <hr />
  </article>`)
}


function clearInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
}

function filterInput() {
  var search = $(this).val();
  $("article").each( function(index, card){
    if(!card.value.includes(search.toLowerCase())) {
      $(this).closest("article").hide()
    } else {
      $(this).closest("article").show()
    }
  })
}

function deleteCard() {
  var ideaID = $(this).closest('article').prop('id');
  localStorage.removeItem(ideaID);
  $(this).closest('article').remove();
}

function downVote() {
  var ideaID = $(this).closest('article').prop('id');
  var IdeaCard = getStorage(ideaID);
  if (IdeaCard.quality === "genius"){
    IdeaCard.quality = "plausible";
    $(this).siblings('.card-quality-text').text("plausible")
  } else if (IdeaCard.quality === "plausible"){
    IdeaCard.quality = "swill";
    $(this).siblings('.card-quality-text').text("swill")
  }
  setStorage(IdeaCard);
}

function upVote() {
  var ideaID = $(this).closest('article').prop('id');
  var IdeaCard = getStorage(ideaID);
  if (IdeaCard.quality === "swill"){
    IdeaCard.quality = "plausible";
    $(this).siblings('.card-quality-text').text("plausible")
  } else if (IdeaCard.quality === "plausible"){
    IdeaCard.quality = "genius";
    $(this).siblings('.card-quality-text').text("genius")
  }
  setStorage(IdeaCard);
}

function editCardTitle() {
  var ideaID = $(this).closest('article').prop('id');
  var titleEdit = getStorage(ideaID);
  titleEdit.title = $(this).val();
  setStorage(titleEdit);
}

function editCardBody() {
  var ideaID = $(this).closest('article').prop('id');
  var bodyEdit = getStorage(ideaID);
  bodyEdit.body = $(this).val();
  setStorage(bodyEdit);
}

function setStorage(idea) {
  var id = idea.id;
  localStorage.setItem(id, JSON.stringify(idea));
}

function getStorage(id) {
  var ideaGot = JSON.parse(localStorage.getItem(id));
  return ideaGot;
}
