import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { LoaderContext } from "../context/LoaderContext";

const Home = () => {
  const { setLoading } = useContext(LoaderContext);
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:9000/api/v1/users");
      setUsers(res.data);
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
      <div className="container">
        <div className="row">
          <div className="col-md-12 "></div>

          <div className="col-md-6">
            <button
              className="text-white float-right bg-gray-800 hover:bg-gray-300 font-medium rounded text-sm px-4 lg:px-5 py-2 lg:py-2.5 mt-2 mr-36 dark:hover:bg-gray-700 transition duration-150 ease-out hover:ease-in"
              type="primary"
              onClick={showModal}
            >
              Add User
            </button>
            <Modal
              title="User Details"
              open={isModalOpen}
              okButtonProps={{ style: { display: "none" } }}
              onCancel={handleCancel}
            >
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    value={input.name}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    value={input.email}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    type="email"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Age
                  </label>
                  <input
                    value={input.age}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    name="age"
                    type="number"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <button
                  type="submit"
                  className="text-white ml-4 float-right bg-gray-800 hover:bg-gray-300 font-medium rounded text-sm px-4 lg:px-5 py-1.5 lg:py-1.5 dark:hover:bg-gray-700 transition duration-150 ease-out hover:ease-in"
                >
                  Submit
                </button>
              </form>
            </Modal>
          </div>
          <div className="col-md-6">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Age</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                          <Link to={`/edit/${user._id}`}>
                            <button className="btn btn-primary">Edit</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handelDelete(user._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
