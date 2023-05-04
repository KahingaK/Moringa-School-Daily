import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import IndividualArticle from "./IndividualArticle";

function MyArticles({ user, userDetails }) {
  const [articles, setArticles] = useState([]);

  const [sortedArticles, setSortedArticles] = useState("");

  const [showArticle, setShowArticle] = useState(false);

  // Keep track of the selected article
  const [selectedArticle, setSelectedArticle] = useState([]);

  function showComponentHandler(article) {
    setSelectedArticle(article);
    toggleContent();
  }

  function toggleContent() {
    setShowArticle(!showArticle);
    // console.log(showArticle)
  }

  useEffect(() => {
    // Fetch the Articles
    fetch("http://localhost:3000/articles", {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);

        if (userDetails.role === "technicalwriter") {
          let filteredArray = data.filter(
            (item) => item.user_id === userDetails.id
          );
          console.log(filteredArray);
          setSortedArticles(filteredArray);
        } else {
          setSortedArticles(data);
        }
      })
      .catch((error) => {
        console.log("Error fetching articles: ", error);
      });
  }, []);

  // console.log(sortedArticles)

  return (
    <div>
      {showArticle ? (
        <IndividualArticle
          userDetails={userDetails}
          toggleContent={toggleContent}
          selectedArticle={selectedArticle}
          user={user}
        />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {sortedArticles.length > 0 ? (
              sortedArticles.map((article) => (
                <div key={article.id} class="w-full">
                  <ArticleCard
                    id={article.id}
                    title={article.title}
                    body={article.body}
                    image={article.image_url}
                    status={article.status}
                    likes={article.likes}
                    dislikes={article.dislikes}
                    article={article}
                    toggleContent={toggleContent}
                    showComponentHandler={showComponentHandler}
                  />
                </div>
              ))
            ) : (
              <p>No articles</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyArticles;
