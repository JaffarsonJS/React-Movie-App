import React from 'react'
import MovieStyles from '../CSS/Movieapp.module.css'
import Loading from './Loading'

function MovieContainer({
  display,
  onSearch,
  getInputData,
  users,
  empField,
  defaultValues,
  imageURL,
  pageNumber,
  isloading,
  isError,
  totalPages,
  searchInput,
  handlePageChange,
}) {
  

  const getRatingColorClass = (rating) => {
    if(rating >= 7) {
      return MovieStyles.greenColor
    } else {
      return MovieStyles.redColor
    }
  }
  console.log(isloading);
  
  return (
    <section>
      <h1>{isError && "Error"}</h1>
    <div className={MovieStyles.inputContainer}>
      <form onSubmit={onSearch} name='movieApp'>
        <input type="text" placeholder={empField || "Search Movie"} onChange={getInputData} value={users}/>
      </form>
        <button onClick={searchInput}>Search</button>
    </div>
    {isloading && <Loading/>}
   
  <div className={MovieStyles.cardContainer}>
    {display.map(({id,poster_path,title,vote_average,overview}) => {
      const ratingColorClass = getRatingColorClass(vote_average)
      return <div key={id} className={MovieStyles.cards}>
      <div>
        <img src={poster_path ? imageURL + poster_path : defaultValues.defaultImage} alt={title} />
      </div>
        <div className={MovieStyles.cardContent}>
        <h2>{title}</h2>
        <h4 className={ratingColorClass}>{vote_average ? (vote_average.toString()).slice(0, 3) : defaultValues.defaultRating}<i class="fa-solid fa-star"></i></h4>
        </div>
      </div>
    })}
  </div>
  <div className={MovieStyles.pagination}>
    {pageNumber > 1 && (<button onClick={() => handlePageChange(pageNumber - 1)}>Prev</button>)}
    {pageNumber < totalPages || (<button onClick={() => handlePageChange(pageNumber + 1)}>Next</button>)}
  </div>
  <footer>
    <p>IMDB Movie Rating App</p>
  </footer>
  </section>
  )
}

export default MovieContainer

