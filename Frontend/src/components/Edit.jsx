import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoaderContext);

  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:9000/api/v1/users/single/${id}`
      );
      setInput(res.data);
    };
    getAllData();
    setLoading(false);
  }, [id]);

  const handleEditData = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`http://localhost:9000/api/v1/users/${id}`, input);
    navigate("/");
    setLoading(false);
  };
  return (
    <>
      <div className="ml-28 mt-24 container show-box">
        <div className="row">
          <div className="col-md-12 "></div>
          <div className="border rounded-xl bg-white border-gray-300 w-4/12 p-5 pb-5 col-md-12">
            <div className="border-b border-solid border-slate-200 mb-5">
              <h3 className="text-2xl font-semibold pb-4">Edit User Details</h3>
            </div>
            <form onSubmit={handleEditData}>
              <div className="mb-3">
                <label
                  for="exampleInputEmail1"
                  className="form-label font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  className="form-control p-1 border-2 rounded ml-3 w-10/12"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label
                  for="exampleInputPassword1"
                  className="form-label font-medium"
                >
                  Email
                </label>
                <input
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="email"
                  className="form-control p-1 border-2 rounded ml-4 w-10/12"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label
                  for="exampleInputPassword1"
                  className="form-label font-medium"
                >
                  Age
                </label>
                <input
                  value={input.age}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  name="age"
                  type="number"
                  className="form-control p-1 border-2 rounded ml-7 w-10/12"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="text-white ml-64 bg-gray-800 hover:bg-gray-300 font-medium rounded text-sm px-4 lg:px-5 py-1.5 lg:py-1.5 dark:hover:bg-gray-700 transition duration-150 ease-out hover:ease-in"
                >
                  Update
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-700 mr-5 border float-right bg-white hover:bg-gray-600 hover:text-white font-medium rounded text-sm px-4 lg:px-5 py-1.5 lg:py-1.5 dark:hover:bg-gray-700 transition duration-150 ease-out hover:ease-in"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
