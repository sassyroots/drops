exports.handler = async (event) => {
  // Slug-to-URL map — add new products here + matching [[redirects]] in netlify.toml
  const routes = {
    "magnesium-mercy": "https://www.sassyroots.com/product/magnesium-mercy/CU6SEZR3OU2DCBHGO5VQ2NFQ?cp=true&sa=false&sbp=false&q=true",
    // "next-product": "https://www.sassyroots.com/product/...",
  };

  // Extract slug from path (ignore query string)
  const slug = event.path.split("/").pop();
  const destination = routes[slug];

  if (!destination) {
    console.log(JSON.stringify({
      event: "miss",
      slug,
      timestamp: new Date().toISOString(),
    }));
    return {
      statusCode: 404,
      body: "Not found",
    };
  }

  // Detect source from UTM parameter
  const params = event.queryStringParameters || {};
  const source = params.utm_source || "link";

  // Log the click
  console.log(JSON.stringify({
    event: "click",
    slug,
    source,                          // "qr" | "link" | anything else passed via utm_source
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
