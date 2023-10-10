let secret =
  "IGQWROVVc4NVlrMVlmQWFTTjc0cGdQN3d4MU1yaVByMmhQWmtQeVhKc0xYYlFwM3BfUDJxYTVUQ1R6TE5JRld1Y2NmR3BJcUh5aHllVDdVcjRQd0pIYk84TndhSEY1TTZAlNDlhaGNYTUpUZAwZDZD";

async function getPosts() {
  try {
    let options = {
      params: {
        fields: "id,caption,media_type,permalink",
        access_token: secret,
      },
    };
    const response = await axios.get(
      "https://graph.instagram.com/me/media",
      options
    );

    data = response.data.data.filter((d) => d.media_type === "IMAGE");

    await getMediaUrl(data.slice(0, 6), displayPost);
  } catch (error) {
    console.error(error);
  }
}

async function getMediaUrl(postsArray, displayPost) {
  try {
    let options = {
      params: {
        fields: "media_url",
        access_token: secret,
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
  let div = document.getElementById(`socials_post-${id}`);
  let a = document.getElementById(`socials_anchor-${id}`);

  div.style.backgroundImage = `url(${postObj.media_url})`;
  a.href = postObj.permalink;
}

getPosts();
