import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import Loader from "../../Components/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();

    // cleanup function
    setArticles([]);
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  if (articles.length == 0) {
    return <Loader text="homepage" />;
  }

  return (
    <>
      <div
        style={{
          fontSize: "32px",
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Latest Articles
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {articles.map((article) => (
          <div
            key={article.url}
            style={{
              backgroundColor: "black",
              border: "1px solid #fff",
              borderRadius: "10px",
              margin: "40px 20px",
              cursor: "pointer",
              width: "20%",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleCardClick(article.url)}
          >
            <img
              src={article.urlToImage}
              style={{ borderRadius: "10px", width: "100%", height: "100%" }}
            />
            <h3
              style={{
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#fff",
                marginTop: "15px",
              }}
            >
              {article.title}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
