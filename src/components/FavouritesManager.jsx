// FavouritesManager.js
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Make sure to import your Supabase client

export function useFavourites(session) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavouriteEpisodesFromDatabase();
  }, [session]);

  const fetchFavouriteEpisodesFromDatabase = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("id", session.user.id);

      if (error) {
        console.log("error fetching episodes", error);
      } else {
        setFavourites(data);
      }
    } catch (error) {
      console.error("error fetching episodes", error.message);
    }
  };

  const addToFavourites = async (podcastId, seasonNumber, episodeNumber) => {
    if (!session) {
      alert("Please sign in to add favorites");
      return;
    }

    const favouriteEpisodeId = `${podcastId}-${seasonNumber}-${episodeNumber}`;

    try {
      const favouriteEpisode = {
        favourite_id: favouriteEpisodeId,
        id: session.user.id,
        date_added: new Date(),
      };

      const { data, error } = await supabase
        .from("favourites")
        .insert([favouriteEpisode]);

      if (error) {
        alert("error saving episode to favourites.", error);
      } else {
        alert("episode is added to favourites", data);
        fetchFavouriteEpisodesFromDatabase();
      }
    } catch (error) {
      console.error("error saving to favourites", error.message);
    }
  };

  const removeFromFavourites = async (favouriteEpisodeId) => {
    try {
      const { data, error } = await supabase
        .from("favourites")
        .delete()
        .eq("id", session.user.id)
        .eq("favourite_id", favouriteEpisodeId);

      if (error) {
        alert("Error removing from favorites:", error);
      } else {
        alert("Episode removed from favorites:", data);
        fetchFavouriteEpisodesFromDatabase();
      }
    } catch (error) {
      console.error("Error removing from favorites:", error.message);
    }
  };

  return {
    favourites,
    addToFavourites,
    removeFromFavourites,
  };
}
