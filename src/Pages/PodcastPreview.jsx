import React, { useEffect, useState } from "react";
import "../Styles/PodcastPreview.css";
import Card from "../Components/Card";
import { genres } from "../services/api";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Search from "../Components/Search";
import SortFilter from "../Components/SortFilter";
import GenreFilter from "../Components/GenreFilter";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Carousel from "../Components/Carousel.";



// eslint-disable-next-line react/prop-types
export default function PodcastPreview({ handleOpenCard, session }) {
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [numOfVisibleShows, setNumOfVisibleShows] = useState(9);
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const [podcastShows, setPodcastShows] = useState([]);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);
  const [loadingMoreShows, setLoadingMoreShows] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [sortedPodcasts, setSortedPodcasts] = useState("");
  const [searchResults, setSearchResults] = useState(podcastShows);
  const [carouselShows, setCarouselShows] = useState([]);

  const navigate = useNavigate();

  /**
   * function to fetch podcast shows from endpoint. Added try catch method to 
   * handle any errors. function will be called in a useEffect
   */
  const fetchPodcasts = async () => {
    try {
      const data = await fetch(`https://podcast-api.netlify.app/shows`);
      const result = await data.json();
      setPodcastShows(result);
      setLoadingPodcasts(false);
    } catch (error) {
      console.log(`ERROR ${error}`);
      setIsError(true);
      setLoadingPodcasts(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  /**
   *Handle initial search and set searchResults to all podcasts 
    */ 
  useEffect(() => {
    setSearchResults(podcastShows);
  }, [podcastShows]);

 

  /**
   * Function to shuffle the shows in the Carousel
   * @param {Array} array 
   * @returns array
   */
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  }

  /**
   * When podcasts are being fetched a loading spinner will be displayey
   */
  if (loadingPodcasts) {
    return (
      <div className="loading--icon">
        <ColorRing
          visible={true}
          height="150"
          width="150"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#003EAB", "#008033", "#EEF3F6", "#003EAB", "#008033"]}
        />
      </div>
    );
  }

  /**
   * Helper function to return genre string
   * @param {Number} genreId 
   * @returns 
   */
  function getGenreTitle(genreId) {
    if (genreId > 0 && genreId <= genres.length) {
      return genres[genreId - 1];
    }
    return "Unknown Genre";
  }

  /**
   * function to handle the opening of a specific podcast
   * also on the carousel slide
   * @param {Number} showId 
   */
  const handleShow = (showId) => {
    handleOpenCard(showId);

    setCarouselShows((prevCarouselShows) =>
      prevCarouselShows.filter((show) => show.id !== showId)
    );
  };

  /**
   * Ternary condition that states if a user clicks on a selected genre from dropdown,
   * It will map over the genres of the podcast to find its corrensponding String value
   * if there is no match then return search Results
   */
  const filteredShowsByGenre = selectedGenre
    ? searchResults.filter((podcast) =>
        podcast.genres
          .map((genreId) => getGenreTitle(genreId))
          .includes(selectedGenre)
      )
    : searchResults;

    /**
     * Function to sort podcasts depending on the option that was chosen
     * @param {String} order 
     */
  const sortPodcast = (order) => {
    setSortedPodcasts(order);

    const orderedShows = [...podcastShows];

    switch (order) {
      case "mostRecent":
        orderedShows.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case "leastRecent":
        orderedShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "titleAZ":
        orderedShows.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleZA":
        orderedShows.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    setPodcastShows(orderedShows);
  };



  /**
   * Function to log user of of the account by removing session for Session Storage
   */
  const handleLogout = () => {
    sessionStorage.removeItem("session");
    alert('You have been logged out')
    navigate("/login");
  };

  /**
   * Function that will handle the loading of more shows
   * when user clicks on the 'Show more' button
   */
  const handleLoadMoreShows = () => {
    setLoadingMoreShows(true);
    try {
      setNumOfVisibleShows((prevVisibleShows) => prevVisibleShows + 9);
      setLoadingPodcasts(false);
    } catch (error) {
      console.error(
        "There was an issue fetching more shows. Try Refreshing Page",
        error
      );
    }
    setLoadingMoreShows(false);
  };

/**
 * Map over podcasts to return each card that has its own individual podcast details
 */
  let shuffledPodcasts = shuffleArray(filteredShowsByGenre);
  const cards = filteredShowsByGenre.slice(0, numOfVisibleShows).map((show) => {
    const genreTitles = show.genres.map((genreId) => getGenreTitle(genreId));
    return (
      <Card
        key={show.id}
        item={show}
        genre={genreTitles}
        handleClick={handleShow}
      />
    );
  });



  const showMoreButton = numOfVisibleShows <= filteredShowsByGenre.length;
  
  return (
    <>
    <div className="intro--container">
      { session ? <p className='welcome'>Welcome Back, {session.user.user_metadata.full_name}👋🏽</p> : <p className="welcome">Welcome to your PodPlug!  Discover, play, and favorite your way through the captivating realm of audio stories. Unplug, unwind, and let the adventure begin!</p>  }
       {session && <button onClick={handleLogout}>Logout</button> }
    </div>
      

      <Container sx={{ mt: "4rem" }}>
        <>
       <h2 className="text">You might be interested in...</h2>
        <Carousel handleClick={handleOpenCard} podcastShows={shuffledPodcasts}/> 
          <div className="filters">
            <Search
              podcastShows={podcastShows}
              setSearchResults={setSearchResults}
            />
              <SortFilter sortPodcast={sortPodcast} />
            <GenreFilter
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
          </div>

          
    <h1 className="text" style={{marginRight: '2rem'}}>Discover more shows...</h1>
          <div className="shows-list">
            
            {cards}</div>
          {loadingMoreShows ? (
            <div className="loading--icon">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#003EAB", "#008033", "#EEF3F6", "#003EAB", "#008033"]}
              />
            </div>
          ) : (
            showMoreButton && (
              <Button
                sx={{ left: "45%", mt: "2rem", mb: "2rem" }}
                endIcon={<AddIcon />}
                size="large"
                color="secondary"
                variant="contained"
                onClick={handleLoadMoreShows}
              >
                Show More
              </Button>
            )
          )}
        </>
      </Container>
    </>
  );
}