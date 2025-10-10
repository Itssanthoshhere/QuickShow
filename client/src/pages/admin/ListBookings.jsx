import { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListBookings = () => {
  const { axios, getToken, user } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllBookings = async () => {
    // setBookings(dummyBookingData);
    // setIsLoading(false);

    const abortController = new AbortController();
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token not available");
      }
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${token}` },
        signal: abortController.signal,
      });
      setBookings(data.bookings);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
        setError("Failed to load bookings. Please try again.");
      }
    }
    setIsLoading(false);
    return () => abortController.abort();
  };

  useEffect(() => {
    let cleanup;
    if (user) {
      cleanup = getAllBookings();
    }
    return () => cleanup?.();
  }, [user]);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full overflow-hidden border-collapse rounded-md text-nowrap">
          <thead>
            <tr className="text-left text-white bg-primary/20">
              <th className="p-2 pl-5 font-medium">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>

          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/20 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 pl-5 min-w-45">{item.user.name}</td>
                <td className="p-2">{item.show.movie.title}</td>
                <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-2">{item.bookedSeats.join(", ")}</td>
                <td className="p-2">
                  {currency}
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
