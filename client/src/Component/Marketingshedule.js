import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
function Marketingshedule() {
  const [reshedule, setReshedule] = useState(false);
  const [sheduledData, setSheduleData] = useState([]);
  const [EditSheduled, setEditSheduled] = useState({});
  useEffect(() => {
    getAllClientsInfo();
  });

  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/marketingClient/marketingcliend/getmarketingclient"
      );
      if (res.status === 200) {
        setSheduleData(res.data.mclient);
      }
    } catch (err) {
      alert(err, "err");
    }
  };

  const handleEditSheduleMeeting = (item) => {
    const selectedDate = new Date(item.msaveMeetingTime);
    const selectedMonth = selectedDate.getMonth(); // Month number (0-11)
    const selectedYear = selectedDate.getFullYear();
    const selectedDay = selectedDate.getDate();
    const selectedTime = selectedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    setEditSheduled(item);
    setReshedule(!reshedule);

    console.log("Selected Date:", selectedDay);
    console.log("Selected Month:", selectedMonth);
    console.log("Selected Year:", selectedYear);
    console.log("Selected Time:", selectedTime);
  };

  const groupedByDate = {};

  sheduledData.forEach((item) => {
    if (item.msaveMeetingTime && !isNaN(new Date(item.msaveMeetingTime))) {
      const date = new Date(item.msaveMeetingTime);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const key = `${year}-${month}-${day}`;

      if (!groupedByDate[key]) {
        groupedByDate[key] = [];
      }
      groupedByDate[key].push(item);
    }
  });
  return (
    <>
      <Header />
      <div className="row m-auto">
        <div className="row">
          {reshedule ? (
            <>
              <p>
                {/* <div>
                  <p>Selected Date: {EditSheduled.selectedDay}</p>
                  <p>Selected Month: {EditSheduled.selectedMonth}</p>
                  <p>Selected Year: {EditSheduled.selectedYear}</p>
                  <p>Selected Time: {EditSheduled.selectedTime}</p>
                </div> */}

                <span>Time : {EditSheduled.msaveMeetingTime}</span>
              </p>
              <p>
                <span>Sheduled call with : {EditSheduled.mclientsName}</span>
              </p>
              <Button
                className="col-md-2 m-2"
                onClick={() => setReshedule(!reshedule)}
              >
                Reshedule
              </Button>
              <Button className="col-md-2 m-2">delete</Button>
            </>
          ) : (
            <div className="col-md-7 m-auto">
              <div className=" calendar ">
                <div className="calendar__month">
                  <h3>Upcoming Events</h3>
                </div>
                {/* <div className="row">
                  <div className="col-md-6">
                    <div>
                      <p className="clr1 clr">July 2023</p>
                    </div>
                    <div>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">14 </span>{" "}
                        <span>Sheduled call with Nike</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">19 </span>{" "}
                        <span>Sheduled call with Linskart</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">25 </span>{" "}
                        <span>Sheduled call with Bata</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p className="clr1 clr">October 2023</p>
                    </div>
                    <div>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">14 </span>{" "}
                        <span>Sheduled call with Nike</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">19 </span>{" "}
                        <span>Sheduled call with Linskart</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">25 </span>{" "}
                        <span>Sheduled call with Bata</span>
                      </p>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div>
                      <p className="clr1 clr">November 2023</p>
                    </div>
                    <div>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">14 </span>{" "}
                        <span>Sheduled call with Nike</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">19 </span>{" "}
                        <span>Sheduled call with Linskart</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">25 </span>{" "}
                        <span>Sheduled call with Bata</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p className="clr1 clr">December 2023</p>
                    </div>
                    <div>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">14 </span>{" "}
                        <span>Sheduled call with Nike</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">19 </span>{" "}
                        <span>Sheduled call with Linskart</span>
                      </p>
                      <p onClick={() => setReshedule(!reshedule)}>
                        <span className="clr1">25 </span>{" "}
                        <span>Sheduled call with Bata</span>
                      </p>
                    </div>
                  </div>{" "}
                </div> */}

                {/* {sheduledData
                  .filter(
                    (item) =>
                      item.msaveMeetingTime !== null &&
                      !isNaN(new Date(item.msaveMeetingTime))
                  )
                  .map((item) => {
                    const date = new Date(item.msaveMeetingTime);
                    if (isNaN(date)) {
                      return null;
                    }
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    const monthName = new Date(2000, month, 1).toLocaleString(
                      "default",
                      { month: "long" }
                    );

                    return (
                      <div key={item._id}>
                        <div>
                          <p className="clr1 clr">{`${monthName} ${year}`}</p>
                        </div>

                        <div>
                          <p onClick={() => handleEditSheduleMeeting(item)}>
                            <span className="clr1"></span>{" "}
                            <span>Sheduled call with {item.mclientsName} </span>
                          </p>
                        </div>
                      </div>
                    );
                  })} */}
                {Object.keys(groupedByDate).map((key) => {
                  const date = new Date(key);
                  const year = date.getFullYear();
                  const month = date.toLocaleString("default", {
                    month: "long",
                  });
                  const day = date.getDate();

                  return (
                    <div key={key}>
                      <div>
                        <p className="clr1 clr">{`${day} ${month} ${year}`}</p>
                      </div>
                      <div>
                        {groupedByDate[key].map((item) => (
                          <div className="row" key={item._id}>
                            <span className="clr1 col-md-1 m-auto">{day}</span>{" "}
                            <span className="col-md-6 m-auto">
                              Sheduled call with {item.mclientsName}{" "}
                            </span>
                            <span
                              className="col-md-4 m-auto text-end cureor"
                              onClick={() => handleEditSheduleMeeting(item)}
                              style={{ color: "blue" }}
                            >
                              Details
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-md-2 m-auto">
                <Button className=" mt-4" href="/Marketing">
                  Sheduled
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Marketingshedule;
