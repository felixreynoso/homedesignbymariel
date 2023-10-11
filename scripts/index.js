// var secret

async function getPosts() {
  try {
    const t = await axios.get(
      "https://qbp1gex47l.execute-api.us-east-2.amazonaws.com/helloWorld"
    );

    console.log(t, "x");
    const secret = "IG".concat(t.data.data);

    let options = {
      params: {
        fields: "id,caption,media_type,permalink",
        access_token: secret,
      },
    };
    console.log(options);
    // const response = await axios.get(
    //   "https://graph.instagram.com/me/media",
    //   options
    // );

    // data = response.data.data.filter((d) => d.media_type === "IMAGE");

    // await getMediaUrl(data.slice(0, 6), displayPost, secret);
  } catch (error) {
    console.error(error);
  }
}

async function getMediaUrl(postsArray, displayPost, secret) {
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
