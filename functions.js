/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  var result = books.find(obj => {
    return obj["id"] === bookId;
  });
  return result;
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  var result = authors.find(obj => {
    return obj["name"].toLowerCase() === authorName.toLowerCase();
  });
  return result;
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  let arr = [];
  for (var i = 0; i < authors.length; i++) {
    arr.push({
      author: authors[i]["name"],
      bookCount: authors[i].books.length
    });
  }
  return arr;
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  for (var i = 0; i < books.length; i++) {
    if (!colors[books[i]["color"]]) {
      colors[books[i]["color"]] = [books[i]["title"]];
    } else {
      colors[books[i]["color"]].push(books[i]["title"]);
    }
  }

  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  let name = authorName;
  if (!name) {
    return [];
  }
  let arr = [];
  for (var i = 0; i < books.length; i++) {
    for (var j = 0; j < books[i]["authors"].length; j++) {
      if (books[i]["authors"][j]["name"].toLowerCase() === name.toLowerCase()) {
        arr.push(books[i]["title"]);
      }
    }
  }
  return arr;
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let books = bookCountsByAuthor(authors);
  let max = 0;
  let obj;
  for (var i = 0; i < books.length; i++) {
    if (books[i].bookCount > max) {
      max = books[i].bookCount;
      obj = books[i];
    }
  }
  return obj.author;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  let book = getBookById(bookId, books);
  authors = [];
  for (var i = 0; i < book["authors"].length; i++) {
    authors.push(book["authors"][i]["name"].toLowerCase());
  }
  let titles = [];
  let arr = [];
  for (var i = 0; i < authors.length; i++) {
    arr = titlesByAuthorName(authors[i], authors, books);
    for (var j = 0; j < arr.length; j++) {
      titles.push(arr[j]);
    }
  }
  return titles;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  let score = {};
  for (var i = 0; i < authors.length; i++) {
    authors[i]["name"] = 0;
  }
  let book;
  let bookId;
  for (var i = 0; i < authors.length; i++) {
    for (var j = 0; j < authors["books"].length; j++) {
      bookId = authors[i]["books"][j];
      book = getBookById(bookId, authors[i]["books"]);
      if (book["authors"].length > 1) {
        for (var x = 0; x < book["authors"].length; x++) {
          score.book["authors"][x]["name"] += 1;
        }
      }
    }
  }
  let names = Object.keys(score);
  let max;
  for (var i = 0; i < names.length; i++) {}
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

const authors = require("./authors.json");
const books = require("./books.json");

//console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
//console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
//console.log(mostProlificAuthor(authors));
console.log(relatedBooks(46, authors, books));
// console.log(friendliestAuthor(authors));
