import React, { useState } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
function Marketingshedule() {
  const [reshedule, setReshedule] = useState(false);

  return (
    <>
      <Header />
      <div className="row m-auto">
        <div className="row">
          {reshedule ? (
            <>
              <p>
                <span className="clr1">19 </span>{" "}
                <span>Sheduled call with Linskart</span>
              </p>
              <Button
                className="col-md-2"
                onClick={() => setReshedule(!reshedule)}
              >
                Reshedule
              </Button>
              <Button className="col-md-2">delete</Button>
            </>
          ) : (
            <div className="col-md-7 m-auto">
              <div className=" calendar ">
                <div className="calendar__month">
                  <h3>Upcoming Events</h3>
                </div>
                <div className="row">
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
                </div>
              </div>
              <div className="col-md-2 m-auto">
                <Button className=" mt-4" href="/Marketing">
                  Sheduled{" "}
                </Button>{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Marketingshedule;
