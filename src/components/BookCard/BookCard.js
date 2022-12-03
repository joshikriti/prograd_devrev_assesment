import React from 'react';
import './bookCard.css';

const BookCard = ({title, imageUrl, publisher, authors, categories, publishedDate, previewLink }) => {
    return (
    <div class="book-card">
        <div class="content-wrapper">
            <img src={imageUrl} alt="" class="book-card-img"/>
            
            <div className='content'>
                <div className='book-title'>{title}</div>
                {
                    publisher && (<div className='publisher'>Publisher: {publisher}</div>)
                } 
                {publishedDate && <div className='publisher'>Published Date: {publishedDate}</div>}
                {
                    authors && (<p className='authors'>By {
                        authors.map(author => {
                            return <span>{author} | </span>
                        })
                    }
                    </p>)
                } 

                {
                    categories && (
                        <p className='categories'>{
                            categories.map(category => {
                                return <span className='category'>{category}</span>
                            })
                        }
                        </p>
                    )
                }
                <div>
                    <a className='previewLink' href={previewLink}>Preview</a>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default BookCard;