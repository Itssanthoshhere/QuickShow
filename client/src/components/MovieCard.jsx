import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const { image_base_url } = useAppContext();

  return (
    <div className="flex flex-col justify-between p-3 transition duration-300 bg-gray-800 rounded-2xl hover:-translate-y-1 w-66">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          window.scrollTo(0, 0);
        }}
        src={image_base_url + movie.backdrop_path}
        alt={`${movie.title} poster`}
        className="object-cover object-right-bottom w-full rounded-lg cursor-pointer h-52"
      />

      <p className="mt-2 font-semibold truncate">{movie.title}</p>

      <p className="mt-2 text-sm text-gray-400">
        {movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : "N/A"}{" "}
        •
        {movie.genres && movie.genres.length > 0
          ? movie.genres
              .slice(0, 2)
              .map((genre) => genre.name)
              .join(" | ")
          : "N/A"}
        • {movie.runtime ? timeFormat(movie.runtime) : "N/A"}
      </p>

      <div className="flex items-center justify-between pb-3 mt-4">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            window.scrollTo(0, 0);
          }}
          className="px-4 py-2 text-xs font-medium transition rounded-full cursor-pointer bg-primary hover:bg-primary-dull"
        >
          Buy Tickets
        </button>
        <p className="flex items-center gap-1 pr-1 mt-1 text-sm text-gray-400">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />{" "}
          {movie.vote_average?.toFixed(1) || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
