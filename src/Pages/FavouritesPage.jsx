import React, { useState, useEffect } from "react";
import { Container, Grid, Paper } from "@mui/material";
import "../Styles/FavouritesPage.css";
import { Link } from "react-router-dom";
import GoBack from "../Components/ReturnBack";
import { changeDateFormat, getDateAndTime } from "../services/helper";
import SortFilter from "../Components/SortFilter";
import { ColorRing } from "react-loader-spinner";
import IconButton from "@mui/material/IconButton";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

// Import Search and GenreFilter components
import Search from "../Components/Search"; // Replace with actual import path
import GenreFilter from "../Components/GenreFilter"; // Replace with actual import path

export default function Favourites({
  FavouritesEpisodesLists,
  toggleFavourite,
  onGoBack,
  playSelectedEpisode,
  session,
}) {
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState("");
  const [sharedURLs, setSharedURLs] = useState({});

  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
      try {
        const episodes = [];

        for (let episode of FavouritesEpisodesLists) {
          const [podcastId, seasonNum, episodeNum] =
            episode.favourite_id.split("-");

          const response = await fetch(
            `https://podcast-api.netlify.app/id/${podcastId}`
          );
          const data = await response.json();
          const seasonData = data.seasons.find(
            (season) => season.season === parseInt(seasonNum)
          );

          const favObject = {
            ID: episode.favouriteId,
            show: data,
            season: seasonData,
            episode: seasonData.episodes.find(
              (episode) => episode.episode === parseInt(episodeNum)
            ),
            dateAdded: episode.date_added,
          };

          episodes.push(favObject);
        }

        setFavouriteEpisodes(episodes);
        setLoadingDetails(false);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setIsError(true);
        setLoadingDetails(false);
      }
    };

    fetchFavoriteEpisodes();
  }, [FavouritesEpisodesLists]);

  const handleShareEpisode = (podcastID, seasonNumber, episodeNumber) => {
    const sharedURL = `=${podcastID}&season=${seasonNumber}&episode=${episodeNumber}`;
    setSharedURLs((prevSharedUrls) => ({
      ...prevSharedUrls,
      [episodeNumber]: sharedURL,
    }));
  };

  const sortPodcast = (order) => {
    setSortedPodcasts(order);

    const orderedShows = [...favouriteEpisodes];

    switch (order) {
      case "mostRecent":
        orderedShows.sort(
          (a, b) => new Date(b.show.updated) - new Date(a.show.updated)
        );
        break;
      case "leastRecent":
        orderedShows.sort(
          (a, b) => new Date(a.show.updated) - new Date(b.show.updated)
        );
        break;
      case "titleAZ":
        orderedShows.sort((a, b) => a.show.title.localeCompare(b.show.title));
        break;
      case "titleZA":
        orderedShows.sort((a, b) => b.show.title.localeCompare(a.show.title));
        break;
      default:
        break;
    }

    setFavouriteEpisodes(orderedShows);
  };

  if (!session) {
    return (
      <>
        <p className="error-info">
          Oops! It seems you haven't signed in yet. Visit the{" "}
          <Link to="/login">Login page</Link> or{" "}
          <Link to="/signup">Sign Up</Link> Up to explore and manage your favourite podcasts!🎧
        </p>
      </>
    );
  }

  if (loadingDetails) {
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

  return (
    <Container sx={{ mt: "2rem" }}>
      <Link to="/">
        <GoBack onGoBack={onGoBack} />
      </Link>

      {session && (
        <p className="text">
          These are your favourite picks, {session.user.user_metadata.full_name}❤️
        </p>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>
            <Search /> {/* Include Search component here */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper>
            <GenreFilter /> {/* Include GenreFilter component here */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <div className="container">
            <h1 className="heading">Sort By</h1>
            <SortFilter sortPodcast={sortPodcast} />
          </div>
        </Grid>
      </Grid>

      {favouriteEpisodes.length === 0 && (
        <p className="text">
          Oops! It seems you haven't added any favorites yet. Explore and add your favorite podcasts!🎧
        </p>
      )}

      {favouriteEpisodes.map((episode) => (
        <div key={episode.ID} className="fav--episode">
          <img className="fav--image" src={episode.show.image} alt={episode.show.title} />
          <div className="fav--details">
            <h4 className="title">{episode.show.title}</h4>
            <p className="episodeNum">
              <span className="bold">Episode {episode.episode.episode}:</span>{" "}
              {episode.episode.title}
            </p>
            <p>{episode.episode.description}</p>
            <p>
              <span className="bold">Last Updated: </span>
              {changeDateFormat(episode.show.updated)}
            </p>
            <p>
              <span className="bold">Added to Favourites:</span>{" "}
              {getDateAndTime(episode.dateAdded)}
            </p>
          </div>
          <button
            className="share--button"
            onClick={() =>
              handleShareEpisode(
                episode.show.id,
                episode.season.season,
                episode.episode.episode
              )
            }
          >
            <ShareIcon /> Share Episode
          </button>
          {sharedURLs[episode.episode.episode] && (
            <div className="Url">
              <p>{sharedURLs[episode.episode.episode]}</p>
            </div>
          )}
          <div className="favourite--buttons">
            <div
              onClick={() => playSelectedEpisode(episode.episode)}
              className="play--button"
            >
              <IconButton
                aria-label="playbutton"
                size="large"
                sx={{ color: "#008033", fontSize: "3rem" }}
              >
                <SmartDisplayOutlinedIcon fontSize="inherit" />
              </IconButton>
            </div>
            <div
              onClick={() =>
                toggleFavourite(
                  episode.show,
                  episode.season,
                  episode.episode
                )
              }
            >
              <IconButton
                sx={{
                  color: "black",
                  fontSize: "3rem",
                }}
                aria-label="favourite"
              >
                <FavoriteIcon fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}
