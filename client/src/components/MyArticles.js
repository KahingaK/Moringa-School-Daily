import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';

function MyArticles({user}) {

    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState("");
  

    useEffect(() => {
        // Fetch the Articles
        fetch("http://localhost:3000/articles",
        
        )
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
        })
        .catch((error) => {
          console.log("Error fetching articles: ", error);
        });
    }, []);

    function handleSort(sortType) {
        setSortBy(sortType);
    }
    
    let sortedArticles = articles;

    if (sortBy === "Pending") {
    sortedArticles = articles.filter(
        (article) => article.status === "Pending"
    );
    } else if (sortBy === "Approved") {
    sortedArticles = articles.filter(
        (article) => article.status === "Approved"
    );
    } else if (sortBy === "Rejected") {
    sortedArticles = articles.filter(
        (article) => article.status === "Rejected"
    );
    }

    console.log(sortedArticles)

  return (
    <div>
        <nav class="flex justify-between items-center border-b border-gray-400 py-4">
          <button className="text-black text-lg font-medium hover:text-gray-500" onClick={() => handleSort("Pending")}>Pending</button>
          <button className="text-black text-lg font-medium hover:text-gray-500" onClick={() => handleSort("Approved")}>Approved</button>
          <button className="text-black text-lg font-medium hover:text-gray-500" onClick={() => handleSort("Rejected")}>Rejected</button>
        </nav>
        {sortedArticles.length > 0 ? (
        sortedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            body={article.body}
            image={article.image_url}
            status={article.status}
            likes={article.likes}
            dislikes={article.dislikes}
          />
        ))
      ) : (
        <p>No articles</p>
      )}
    </div>
  )
}

export default MyArticles