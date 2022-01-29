//api calls
const baseUrl = "http://localhost:3000/news";

//api call to get all posts
const getPosts = async () => {
  const response = await fetch(`${baseUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

//api call to add post
const addPost = async (post) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

// api call to remove post
const removePost = async (i) => {
  const response = await fetch(`${baseUrl}/${i}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
//api call to edit post
const editPost = async (post) => {
  const response = await fetch(`${baseUrl}/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/********** CREATE API **********/
const handleCreate = async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const errors = [];
  if (title.length < 5) errors.push("Title must be at least 5 characters");
  if (content.length < 5) errors.push("Content must be at least 5 characters");
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  const post = {
    title,
    date: new Date(Date.now()).toDateString(),
    content,
  };
  const response = await addPost(post);
};

var submitBtn = document.querySelector("#submit-btn");

const setForm = async (post) => {
  let title = document.getElementById("title");
  let content = document.getElementById("content");

  title.value = post.title;
  content.value = post.content;

  //change submit button to update button
  submitBtn.innerHTML = "Update";

  submitBtn.id = "update-btn";
  //store post id
  submitBtn.setAttribute("data-id", post.id);
};
var newPost = {};
const handleUpdate = async () => {
  const id = submitBtn.getAttribute("data-id");
  let title = document.getElementById("title");
  let content = document.getElementById("content");

  newPost = {
    title: title.value,
    content: content.value,
    id: id,
  };
  const response = await editPost(newPost);
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id == "submit-btn") handleCreate(e);
  else handleUpdate(newPost);
});

/********** GET API **********/
let posts = [];
const personalFeed = document.querySelector("#posts-personal");
const listPosts = document.querySelector("#list-posts");
const postsElement = document.getElementsByClassName("post-personal");

const getPersonalPosts = async () => {
  const response = await getPosts();
  posts = response;
  //create elements
  posts.map((element, i) => {
    const card = document.createElement("div");
    card.classList.add("post-personal");
    if (localStorage.getItem("theme") === "dark")
      card.classList.add("darkCard");
    else card.classList.add("lightCard");
    const title = document.createElement("h2");
    title.innerHTML = element.title;
    title.classList.add("title");
    card.append(title);
    card.innerHTML += ` <div id="btns">
            <i class="fa fa-pencil" aria-hidden="true" id="edit-btn"></i>
            <i class="fa fa-trash" aria-hidden="true" id="delete-btn"></i>
          </div>`;
    listPosts.append(card);
    //adding event listeners
    postsElement[i].addEventListener("click", (e) => {
      if (e.target.id === "edit-btn") setForm(element);
      else if (e.target.id === "delete-btn") removePost(element.id);
    });
  });
};
//get post of the current user
getPersonalPosts();
