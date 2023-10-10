let access_token =
  "IGQWRNd3F0VFU4SEFYX205XzZAHeDNjOVZAHRkZAOVzZA2V0d2RTEtS1U5MUZAXejNMT0llM2ZALMXN6MTZAsZA1BUVV9UWWhRcldkU2ZAiaW5KcXBhc1NzQWkxRGF1MjRsbVN5SEg4RWcwS0FTVlh4UQZDZD";

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
  let img = document.getElementById(`socials_post-${id}`);
  img.src = postObj.media_url;
}

// getPosts();
