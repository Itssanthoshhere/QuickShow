import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [axios, getToken]);

  useEffect(() => {
    if (user) {
      getMyBookings();
    } else {
      setIsLoading(false);
    }
  }, [user, getMyBookings]);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>

      <h1 className="mb-4 text-lg font-semibold">My Bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between max-w-3xl p-2 mt-4 border rounded-lg md:flex-row bg-primary/8 border-primary/20"
        >
          <div className="flex flex-col md:flex-row">
            <img
              src={image_base_url + item.show.movie.poster_path}
              alt=""
              className="object-cover object-bottom h-auto rounded md:max-w-45 aspect-video"
            />

            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold">{item.show.movie.title}</p>
              <p className="text-sm text-gray-400">
                {timeFormat(item.show.movie.runtime)}
              </p>
              <p className="mt-auto text-sm text-gray-400">
                {dateFormat(item.show.showDateTime)}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 md:items-end md:text-right">
            <div className="flex items-center gap-4">
              <p className="mb-3 text-2xl font-semibold">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <Link
                  to={item.paymentLink}
                  className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer"
                >
                  Pay Now
                </Link>
              )}
            </div>

            <div className="text-sm">
              <p>
                <span className="text-gray-400">Total Tickets:</span>
                {item.bookedSeats.length}
              </p>
              <p>
                <span className="text-gray-400">Seat Number:</span>
                {item.bookedSeats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
