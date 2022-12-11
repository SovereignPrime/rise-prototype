import React from 'react';
import "./searchResults.scss";

// Search algorithm approximation for misspellings
const levenshteinDistance = (str1 = '', str2 = '') => {
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
       track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
       track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
       for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          track[j][i] = Math.min(
             track[j][i - 1] + 1, // deletion
             track[j - 1][i] + 1, // insertion
             track[j - 1][i - 1] + indicator, // substitution
          );
       }
    }
    return track[str2.length][str1.length];
  };

const SearchResults = (props) => {
    // properties: searchTerm, shoppingItems

    return (
        <div className="container">
            <h1>Search Results for: {props.searchTerm}</h1>
            {props.shoppingItes.filter(item => {
                {/* For each word of the item */}
                const words = item.prodName.toLowerCase().split(' ');
                let matches1Word = false;

                {/* If the search term approximately matches any word of the current item, return true */}
                words.forEach((word, i) => {
                    console.log("Word: " + word, "i: " + i);
                    const distance = levenshteinDistance(word, props.searchTerm);
                    if (distance <= 3) {
                        matches1Word = true;
                    }
                })
                return matches1Word
            })
            .map((result, i) => {
                return (
                    <div className="result">
                        <div className="profile">
                            <img src={result.perPic} alt="profile" width="50px"/>
                            <p>{result.perName}</p>
                        </div>
                        <p className="info">{result.prodName}</p>
                        <p className="info">${result.Price}</p>
                        {/* <button text="Details" width="30px"/> */}
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults