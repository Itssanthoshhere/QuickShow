import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    // setDashboardData(dummyDashboardData);
    // setLoading(false);

    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap w-full gap-4">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full px-4 py-3 border rounded-md bg-primary/10 border-primary/20 max-w-50"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="mt-1 text-xl font-medium">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap max-w-5xl gap-6 mt-4">
        <BlurCircle top="100px" left="-10%" />
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="h-full pb-3 overflow-hidden transition duration-300 border rounded-lg w-55 bg-primary/10 border-primary/20 hover:-translate-y-1"
          >
            <img
              src={image_base_url + show.movie.poster_path}
              alt={`${show.movie.title} poster`}
              className="object-cover w-full h-60"
            />
            <p className="p-2 font-medium truncate">{show.movie.title}</p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency} {show.showPrice}
              </p>
              <p className="flex items-center gap-1 pr-1 mt-1 text-sm text-gray-400">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />+{" "}
                {show.movie.vote_average?.toFixed(1) || "N/A"}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
