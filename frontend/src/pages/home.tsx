import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="h-50 w-50 p-1 ml-100 mt-30 bg-yellow-950 flex justify-center items-center">
        <h1 className="text-white font-bold">
          <Link to="/about">Prashnat </Link>{" "}
          <span className="font-bold text-red-700">Bhandari</span>
        </h1>
      </div>
    </>
  );
};

export default Home;
