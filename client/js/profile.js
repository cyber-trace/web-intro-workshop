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
const removePost = async (post) => {
  const response = await fetch(`${baseUrl}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/********** CREATE API **********/
const createPost = async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  //   const errors = [];
  //   if (title.length < 5) errors.push("Title must be at least 5 characters");
  //   if (content.length < 5) errors.push("Content must be at least 5 characters");
  //   if (errors.length > 0) {
  //     alert(errors.join("\n"));
  //     return;
  //   }

  const post = {
    title,
    date: new Date(Date.now()).toDateString(),
    content,
  };
  const response = await addPost(post);
  console.log(response);
  console.log("createPost");

  //   if (response.status === 200) {
  //     alert("Post created");
  //     window.location.href = "/";
  //   }
  //   else alert("Error creating post");
};

const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createPost(e);
});

/********** GET API **********/
let posts = [];
const personalFeed = document.querySelector("#posts-personal");
const listPosts = document.querySelector("#list-posts");
const getPersonalPosts = async () => {
  const response = await getPosts();
  console.log(response);
  posts = response;
  posts.map((element) => {
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
    // const date = document.createElement("p");
    // date.innerHTML = element.date;
    // date.classList.add("date");
    // card.append(date);
    // const content = document.createElement("p");
    // content.innerHTML = element.content;
    // content.classList.add("content");
    // card.append(content);
    console.log(card);
    listPosts.append(card);
  });
};
//get post of the current user
getPersonalPosts();
