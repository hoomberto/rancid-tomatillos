import React from "react"
import Trailer from '../Trailer/Trailer.js';
import "./MoviePage.css"
import Rating from '../Rating/Rating.js'
import { render } from "@testing-library/react";
import { Link } from "react-router-dom"

class MoviePage extends React.Component {
  constructor() {
    super()
      this.state = {
        id: null,
        info: null,
        isLoading: true
      }



    };

    componentDidMount() {
      let url = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/';
      let movieUrl = url + this.props.movieID
      fetch(movieUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({id: this.props.movieID, info: data, isLoading: false})
      })
    }

    renderMovie = () => {
      // const { movie } = this.state.info
      // console.log("STATE INFO", this.state.info)
      // console.log("DECON MOVIE", movie)
      //
      // const genres = movie.genres.map(genre=> <div className="genre">{genre}</div>)
      // const styles = {
      // backgroundImage: `url(${movie.backdrop_path})`
      // }
      //
      // const formatTime = () => {
      //   if (movie.runtime > 60) {
      //     const time = {
      //       hours: (Math.floor(movie.runtime / 60)),
      //       minutes: (movie.runtime % 60)
      //     }
      //     return `${time.hours} hr ${time.minutes} min`
      //   }
      //   return `${movie.runtime} min`
      // }


  };



render() {

  const { movie } = this.state.info || {}
  // console.log("STATE INFO", this.state.info)
  // console.log("DECON MOVIE", movie)

  const setGenreStyles = (movie) => {
    if (!movie.genres) {
      return
    }
    const genres = movie.genres.map(genre=> <div className="genre">{genre}</div>)
    const styles = {
      backgroundImage: `url(${movie.backdrop_path})`
    }

    return {
      g: genres,
      s: styles
    }
  }

//   const genres = movie.genres.map(genre=> <div className="genre">{genre}</div>)
//   const styles = {
//   backgroundImage: `url(${movie.backdrop_path})`
// } || {}

  const formatTime = () => {
    if (!movie.runtime) {
      return
    }
    if (movie.runtime > 60) {
      const time = {
        hours: (Math.floor(movie.runtime / 60)),
        minutes: (movie.runtime % 60)
      }
      return `${time.hours} hr ${time.minutes} min`
    }
    return `${movie.runtime} min`
  }

    return (
      <section>
        {!this.state.isLoading &&

          <div className="background-image" style={setGenreStyles(movie).s}>
            <div className="info-media">
              <div className="poster-trailers">
                <div className="image-container">
                <img src={movie.poster_path}
                  className="single-poster"
                  height="402px"
                  width="268px"/>
                </div>
                  <Trailer
                    id={movie.id}
                    title={movie.title}
                    />
              </div>
              <div className="movie-info">
                <h1>{movie.title} <p className="year">({movie.release_date.split('-')[0]})</p></h1>
                <Rating rating={movie.average_rating} />
                <h2 className="tagline">{movie.tagline}</h2>
                <p>{!movie.overview ? "No overview available" : movie.overview}</p>
                <div className="rating-runtime-genre">
                  <div className="runtime-rating">
                    <p className="runtime"><strong>{formatTime()}</strong></p>
                  </div>
                  <div className="genre-container">
                    {setGenreStyles(movie).g}
                  </div>
                </div>
                <Link to="/">
                  <button>Go Back</button>
                </Link>
              </div>
            </div>
          </div>

        }
      </section>
    )
  }
}

export default MoviePage
