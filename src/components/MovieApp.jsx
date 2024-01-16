import React , { useEffect, useState } from 'react'
import axios from 'axios'
import MovieContainer from './MovieContainer'
import Ina from "../assests/not available.jpg"
import Loading from './Loading'

function MovieApp(props) {

  //^ States
  const [users,setusers] = useState("")
  const [display,setDisplay] = useState([])
  const [empField,setEmpField] = useState(false)
  const [pageNumber,setPageNumber] = useState(1)
  const [totalPages,setTotalPages] = useState(1)
  const [isloading,setIsLoading] = useState(true)
  const [isError,setIsError] = useState(false)

  //^ useEffect
  useEffect(()=> {
    getMovies(pageNumber)
    
  },[pageNumber])

  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${users}&api_key=d20f3d07e092055066c6afc65a641a4a`
  const discover = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d20f3d07e092055066c6afc65a641a4a&page=${pageNumber}`
  const imageURL = "https://image.tmdb.org/t/p/w1280"

  //^ Discover Api
  async function getMovies() {
    try {
    const response = await axios.get(discover)
    setDisplay(response.data.results)
    setTotalPages(response.data.total_Pages)
    console.log(response.data.results)
    setIsLoading(false)
    setIsError(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }
 
  //^ Input Api
  async function searchInput(){
    if(users.trim() === "") {
      setEmpField("Field is Empty")
    } else {
    const inputResponse = await axios.get(apiSearch)
    setDisplay(inputResponse.data.results)
    console.log(inputResponse);
    setusers("")
    setEmpField("") 
  } }

  //^ Getting Input Value
  const getInputData = ({target:{value}}) => {
    setusers(value)
  }

  //^ Submitting Form
  const onSearch = (e) => {
    e.preventDefault()
    searchInput()
  }

  //^ Default Values
  const defaultValues = {
    defaultImage: {Ina},
    defaultRating: "N/A",
    // defaultImage: "https://st3.depositphotos.com/32990740/35467/v/450/depositphotos_354674378-stock-illustration-isolated-picture-flat-style-icon.jpg"
  }

  //^ Page Handling
  const handlePageChange = (newPage) => {
    setPageNumber(newPage)
  }
  
  return (
    <MovieContainer
    display={display}
    onSearch={onSearch}
    getInputData={getInputData}
    users={users}
    searchInput={searchInput}
    empField={empField}
    defaultValues={defaultValues}
    imageURL={imageURL}
    pageNumber={pageNumber}
    totalPages={totalPages}
    handlePageChange={handlePageChange}
    isloading={isloading}
    isError={isError}
  />
  )
}

export default MovieApp