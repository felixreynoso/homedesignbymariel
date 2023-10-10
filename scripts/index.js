let access_token =
  "IGQWRQWHNYYWs4T3lrSS1yWmxKdVJ4elRab1VXcTB1dXlTUmw1c1ZA4eUx5WUhJUG81OHg0YUhRakVBQnlUcHkxMXRza3N6SThmUlBfN2pHdDA0Unh6RzZAwTkNKekZAWODBqUHJuQks0ZAzVVZAwZDZD";

async function getPosts() {
  try {
    let options = {
      params: {
        fields: "id,caption",
        access_token: access_token,
      },
    };
    const response = await axios.get(
      "https://graph.instagram.com/me/media",
      options
    );

    await getMediaUrl(response.data.data.slice(0, 6), displayPost);
  } catch (error) {
    console.error(error);
  }
}

async function getMediaUrl(postsArray, displayPost) {
  try {
    let options = {
      params: {
        fields: "media_url",
        access_token: access_token,
      },
    };

    postsArray.forEach(async (post, id) => {
      const response = await axios.get(
        `https://graph.instagram.com/${post.id}`,
        options
      );
      displayPost({ ...post, media_url: response.data.media_url }, id);
    });
  } catch (error) {
    console.error(error);
  }
}

function displayPost(postObj, id) {
  console.log(id);
  let div = document.getElementById(`socials_post-${id}`);
  div.style.backgroundImage = `url('${postObj.media_url}')`;
}

getPosts();
