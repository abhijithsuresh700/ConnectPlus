import axios from "axios";
import React, { useEffect, useState } from "react";
import userInstance from "../../../Axios/userAuth";
import "./friendRequests.scss";

function FriendRequests() {
  const userId = localStorage.id;
  const [connectionList, setConnectionList] = useState([]);

  useEffect(() => {
    userInstance
      .get("/connectionRequestList/" + userId, {})
      .then((response) => {
        console.log(response.data, "response data of connection requests");
        setConnectionList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(connectionList, "connection listsssssssssss");

  const acceptConnection = (id) => {
    // console.log(id,"accepted you");
    axios
      .post(`http://localhost:9000/acceptConnection/${userId}/${id}`, {})
      .then((response) => {
        //    setRequestList(response.data)
        console.log(response.data, "acepterrrrrrrrrrrrrrrr");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //declineConnection

  const declineConnection = (id) => {
    // console.log(id,"declined you");
    axios
      .post(`http://localhost:9000/declineConnection/${userId}/${id}`, {})
      .then((response) => {
        //    setRequestList(response.data)
        console.log(response.data, "acepterrrrrrrrrrrrrrrr");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };




  console.log(connectionList.length, "lengthh");

  return (
    <>
      {connectionList.length === 0 ? (
        <h3>No Connection Requests</h3>
      ) : (
        connectionList.map((connectionList) => {
          return (
            <div className="requests">
              <div className="userName">
                {connectionList?.profilePic ? (
                  <img
                    src={`http://localhost:9000/images/${connectionList?.profilePic}`}
                    className="profilePic"
                  />
                ) : (
                  <img
                    src="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg"
                    style={{ width: "10px", height: "10px" }}
                    className="profilePic"
                  />
                )}
                <h3>{connectionList?.name}</h3>
                <p>
                  <i>Sent you a Connection Request</i>
                </p>
                <button
                  onClick={() => {
                    acceptConnection(connectionList?._id);
                  }}
                >
                  Confirm
                </button>
                <button onClick={() => {
                    declineConnection(connectionList?._id);
                  }}>Decline</button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default FriendRequests;
