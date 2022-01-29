const baseUrl = "http://localhost:8000/news";

export const addPost = async (post) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

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
