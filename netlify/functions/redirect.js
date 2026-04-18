exports.handler = async (event) => {
  // Slug-to-URL map — mirrors your netlify.toml redirects
  const routes = {
    "magnesium-mercy": "https://www.sassyroots.com/product/magnesium-mercy/CU6SEZR3OU2DCBHGO5VQ2NFQ?cp=true&sa=false&sbp=false&q=true",
  };

  // Extract slug from path: /.netlify/functions/redirect/magnesium-mercy
  const slug = event.path.split("/").pop();
  const destination = routes[slug];

  if (!destination) {
    return {
      statusCode: 404,
      body: "Not found",
    };
  }

  // Log the click — visible in Netlify Function logs
  console.log(JSON.stringify({
    event: "click",
    slug,
    destination,
    timestamp: new Date().toISOString(),
    referrer: event.headers?.referer || "direct",
    userAgent: event.headers?.["user-agent"] || "unknown",
  }));

  return {
    statusCode: 302,
    headers: {
      Location: destination,
    },
    body: "",
  };
};
