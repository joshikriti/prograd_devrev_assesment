import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import BookCard from './components/BookCard/BookCard';
import SearchFilter from './components/SearchFilter/SearchFilter';
import Pagination from './utils/Pagination';


function App() {
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState([]);
  const [params, setParams] = useState({author:"ruskin bond"});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);

  const fetchData = async () => {
    setLoading(true);
    await axios.get('https://www.googleapis.com/books/v1/volumes'
    , {
      params: {
        q: `
        ${
          params.title ? (`+intitle:${params.title}`): 
          (params.author ? (`+inauthor:${params.author}`): 
          (params.publisher ? (`+inpublisher:${params.publisher}`): 
          (params.subject ? (`+subject:${params.subject}`) : ""))) 
        }`,
        projection: "full",
        key: "AIzaSyD9s_lJ2IQvCNaZtnntRfj14tBp-o9E2lE",
        printType:"books",
        maxResults:"40",
      }
    }
    ).then((res) => {
      setBooks(res.data.items.filter(isDate));
      // console.log(res.data);
      setBookCount(res.data.totalItems);
    });

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [params]);

  // Get current Posts
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  
  const trigger = (data) => {
    setParams(data);
  }

  const isDate = (value) => {
    // console.log(params.date);
    // if(params.date != undefined){ 
    //   var date = params.date?.toString().split("-");
    //   var date2 = value.volumeInfo.publishedDate?.split("-")
    //   if((date[2] === date2[2] && date[0] === date2[0]) || (date[1] === date2[1] && date[0] === date2[0]) || date[0] == date2[0]){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // }else{
    //     return true;
    //   }
      return true;
  }


  return (
    <div className="App">
      <div className='search'>
        <h4> <span>Total Books: {bookCount}</span> </h4>
        <h1>LMS</h1>
        <SearchFilter trigger={trigger} />
      </div>
      <div className='booklist'>
        <ul className='list-group mb-4'>
        
          {
              loading ? <h4> Loading... </h4> : 
              currentBooks.map(book => (
                  <li key={book.id}>
                    <BookCard title={book.volumeInfo.title} 
                    imageUrl={book.volumeInfo.imageLinks?.thumbnail}
                    authors = {book.volumeInfo.authors}
                    publisher = {book.volumeInfo.publisher}
                    publishedDate = {book.volumeInfo.publishedDate}
                    categories = {book.volumeInfo.categories}
                    previewLink = {book.volumeInfo.previewLink}
                    />
                  </li>
              ))
          }
        </ul>
        <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate}/>
      </div>
    </div>
  );
}

export default App;
