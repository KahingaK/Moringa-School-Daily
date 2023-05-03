import React from 'react'

import { useEffect, useState } from "react"
import Subscription from './Subscription';


function Categories({user}) {
    
        const [category, setCategories] = useState([]);

        useEffect(() => {
            // Fetch the Articles
            fetch("http://localhost:3000/categories",
            )
            .then((response) => response.json())
            .then((data) => {
              setCategories(data);
            })
            .catch((error) => {
              console.log("Error fetching categories: ", error);
            });
        }, []);
    
       
      

  return (
    <div>Categories
    <Subscription user = {user} categories = {category}/>
    </div>
  )
}

export default Categories