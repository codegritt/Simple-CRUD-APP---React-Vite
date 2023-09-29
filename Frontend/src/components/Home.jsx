import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import axios from "axios";

const Home = () => {
  const { setLoading } = useContext(LoaderContext);
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [showModal, setShowModal] = React.useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:9000/api/v1/users");
      setUsers(res.data);
      setApiUsers(data.users);
      setFilteredUsers(data.users);
    };
    getAllData();
    setLoading(false);
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("http://localhost:9000/api/v1/users", input);
    setRender(true);
    setInput({
      name: "",
      email: "",
      age: "",
    });
    setLoading(false);
  };

  const handelDelete = async (id) => {
    setLoading(true);
    await axios.delete(`http://localhost:9000/api/v1/users/${id}`);
    const newUsers = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(newUsers);
    setLoading(false);
  };

  return (
    <>
      <div className="container show-box">
        <div className="row">
          <div className="col-md-12 "></div>

          <div className="col-md-6">
            <a
              href="#"
              class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              data-te-toggle="tooltip"
              title="Click here to add user"
            >
              <button
                className="text-white mt-5 float-right bg-gray-800 hover:bg-gray-300 font-medium rounded text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-36 dark:hover:bg-gray-700 transition duration-150 ease-out hover:ease-in"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Add User
              </button>
            </a>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none show-box">
                  <div className="relative my-6 mx-auto w-4/12 max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold">User Details</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>

                      <div className="relative p-6 flex-auto">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label
                              for="exampleInputEmail1"
                              className="form-label font-medium"
                            >
                              Name
                            </label>
                            <input
                              name="name"
                              value={input.name}
                              onChange={(e) =>
                                setInput({
                                  ...input,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              type="text"
                              className="form-control p-1 border-2 rounded ml-4 w-10/12"
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
                                setInput({
                                  ...input,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              type="email"
                              className="form-control p-1 border-2 rounded ml-5 w-10/12"
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
                                setInput({
                                  ...input,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="age"
                              type="number"
                              className="form-control p-1 border-2 rounded ml-8 w-10/12"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <div className="border-t pt-5">
                            <button
                              type="submit"
                              className="text-white ml-72 bg-gray-800 hover:bg-gray-300 font-medium rounded text-sm px-4 lg:px-5 py-1.5 lg:py-1.5 dark:hover:bg-gray-700 transition duration-150 ease-out hover:ease-in"
                            >
                              Submit
                            </button>
                            <button
                              className="text-gray-700 border float-right bg-white hover:bg-gray-600 hover:text-white font-medium rounded text-sm px-4 lg:px-5 py-1.5 lg:py-1.5 dark:hover:bg-gray-700 transition duration-150 ease-out hover:ease-in"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="opacity-25 fixed inset-0 z-40 bg-gray-400"></div>
              </>
            ) : null}
          </div>

          <div className="flex flex-col w-9/12">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="p-8 mt-20 ml-20 overflow-hidden">
                  <input
                    className="form-control mb-5 p-1 pl-2 border-2 rounded ml-4 w-11/12 outline-none outline-0"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users"
                  />

                  <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Age
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users
                          .filter((user) => {
                            return search.toLowerCase() === ""
                              ? user
                              : user.name.toLowerCase().includes(search);
                          })
                          .map((user) => {
                            return (
                              <tr
                                className="border-b dark:border-neutral-500 show-box"
                                key={user._id}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {user.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {user.email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {user.age}
                                </td>
                                <td className="flex justify-between whitespace-nowrap px-6 py-4 font-medium">
                                  <a
                                    href="#"
                                    class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    data-te-toggle="tooltip"
                                    title="Click here to edit user"
                                  >
                                    <Link to={`/edit/${user._id}`}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                      </svg>
                                    </Link>
                                  </a>
                                  <a
                                    href="#"
                                    class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    data-te-toggle="tooltip"
                                    title="Click here to delete user"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                      onClick={() => handelDelete(user._id)}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
