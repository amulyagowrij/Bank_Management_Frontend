import { useEffect, useState } from "react";
import axios from "axios";
import "./internaluserviewuserprofiles.scss";
import Dashboard from "../Dashboard/dashboard";

let VIEW_PROFILE_URL = "http://localhost:8000/internaluser/viewuserprofiles";
let DELETE_ACCOUNT_URL = "http://localhost:8000/internaluser/deleteaccount";
// const data = [
//   {
//     username: "mayurbhat",
//     account_number: 111222,
//     email: "mayur@yahoo",
//     created_date: "2025-02-25",
//     type: "Credited",
//     amount: 1000,
//   },
//   {
//     username: "mayurbhat",
//     account_number: 111222,
//     email: "mayur@yahoo",
//     created_date: "2025-02-25",
//     type: "Debited",
//     amount: 1000,
//   },
//   {
//     username: "mayurbhat",
//     account_number: 111222,
//     email: "mayur@yahoo",
//     created_date: "2025-02-25",
//     type: "Debited",
//     amount: 1000,
//   },
// ];

const InternalUserViewUserProfiles = () => {
  const [user_data, setUserData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(VIEW_PROFILE_URL);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteRecord = (user_id) => {
    axios
      .delete(`${DELETE_ACCOUNT_URL}/${user_id}`)
      .then((response) => {
        // Delete was successful, update state to remove the deleted item
        if (response.status === 204) {
          alert("Account deleted successfully");
        }
        setUserData((prevUserData) =>
          prevUserData.filter((account) => account.user_id !== user_id)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the account!", error);
      });
  };

  return (
    <>
      <Dashboard role="internaluser" />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Account Number</th>
              <th>Email Id</th>
              <th>Created Date</th>
              <th>View Details</th>
              <th>Delete account</th>
            </tr>
          </thead>
          <tbody>
            {user_data.map((account) => (
              <tr key={account.user_id}>
                <td>{account.user_name}</td>
                <td>{account.account?.account_number}</td>
                <td>{account.email}</td>
                <td>{account.created_at}</td>
                <td>
                  <button className="view_profile">View Profile</button>
                </td>
                <td>
                  <button
                    id="delete"
                    className="delete"
                    onClick={() => deleteRecord(account.user_id)}
                  >
                    Delete Account
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InternalUserViewUserProfiles;
