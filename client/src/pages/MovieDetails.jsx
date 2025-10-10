import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavouriteMovies,
    favouriteMovies,
    image_base_url,
  } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavourite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed ");

      const { data } = await axios.post(
        "/api/user/update-favourite",
        {
          movieId: id,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        await fetchFavouriteMovies();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col max-w-6xl gap-8 mx-auto md:flex-row">
        <img
          src={image_base_url + show.movie.poster_path}
          alt=""
          className="object-cover rounded-xl h-104 max-w-70"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary">ENGLISH</p>

          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average?.toFixed(1) || "N/A"} User Rating
          </div>

          <p className="max-w-xl mt-2 text-sm leading-tight text-gray-400">
            {show.movie.overview}
          </p>

          <p>
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ") || "N/A"} •{" "}
            {show.movie.release_date
              ? show.movie.release_date.split("-")[0]
              : "N/A"}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button className="flex items-center gap-2 py-3 text-sm font-medium transition bg-gray-800 rounded-md cursor-pointer px-7 hover:bg-gray-900 active:scale-95">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm font-medium transition rounded-md cursor-pointer bg-primary hover:bg-primary-dull active:scale-95"
            >
              Buy Tickets
            </a>

            <button
              onClick={handleFavourite}
              className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"
            >
              <Heart
                className={`w-5 h-5 ${
                  favouriteMovies.find((movie) => movie._id === id)
                    ? "fill-primary text-primary"
                    : ""
                } `}
              />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-20 text-lg font-medium">Your Favourite Cast</p>
      <div className="pb-4 mt-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 px-4 w-max">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {cast.profile_path ? (
                <img
                  src={image_base_url + cast.profile_path}
                  alt=""
                  className="object-cover h-20 rounded-full md:h-20 aspect-square"
                />
              ) : (
                <div className="flex items-center justify-center h-20 bg-gray-700 rounded-full md:h-20 aspect-square">
                  <span className="text-xs text-gray-400">No Image</span>
                </div>
              )}
              <p className="mt-3 text-xs font-medium">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className="mt-20 mb-8 text-lg font-medium">You May Also Like</p>
      <div className="flex flex-wrap gap-8 max-sm:justify-center">
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm font-medium transition rounded-md cursor-pointer bg-primary hover:bg-primary-dull"
        >
          Show more
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
