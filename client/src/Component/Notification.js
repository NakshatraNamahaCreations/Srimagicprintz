import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useGlobalNotification } from "../Component/NotificationContext";

export default function Notification() {
  const [recceData, setRecceData] = useState([]);
  const { notifications, dispatch } = useGlobalNotification();
  const [audio] = useState(new Audio("../audio/notification-alert.wav"));
  const [lastNotifiedTime, setLastNotifiedTime] = useState(null);

  const isNotificationRecent = (notification, minutesAgo) => {
    const notificationTimestamp = new Date(notification.timestamp);
    const currentTime = new Date();
    const timeDifference = (currentTime - notificationTimestamp) / (1000 * 60);
    return timeDifference <= minutesAgo;
  };
  useEffect(() => {
    // Use dispatch here
  }, [dispatch]);
  useEffect(() => {
    getAllRecce();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        const recceData = res.data.RecceData;
        setRecceData(recceData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    recceData.forEach((recceitem) => {
      recceitem.outletName.forEach((outlet) => {
        const outletId = outlet._id;
        const updatedAt = new Date(outlet.updatedAt);

        const statusTypes = [
          { key: "RecceStatus", label: "Recce " },
          { key: "Designstatus", label: "Design " },
          { key: "printingStatus", label: "Printing " },
          { key: "fabricationstatus", label: "Fabrication " },
          { key: "installationSTatus", label: "Installation " },
        ];
        const recentNotifications = notifications.filter((notification) =>
          isNotificationRecent(notification, 5)
        );
        if (outletId && recentNotifications) {
          statusTypes.forEach((statusType) => {
            const status = outlet[statusType.key];
            const label = statusType.label;
            let notificationText = "";

            if (
              status &&
              status !== "Pending" &&
              updatedAt > lastNotifiedTime
            ) {
              const Info = recceData
                .flatMap((item) =>
                  item.outletName.filter((ele) => ele._id === outletId)
                )
                .flatMap((ele) => ele.ShopName);

              notificationText = `${label} ${status} for ${Info}`;

              const isDuplicate = notifications.some(
                (notification) => notification.text === notificationText
              );

              if (!isDuplicate) {
                dispatch({
                  type: "ADD_NOTIFICATION",
                  payload: {
                    text: notificationText,
                    id: outletId,
                    updatedAt: updatedAt,
                  },
                });

                audio
                  .play()
                  .then(() => {
                    setLastNotifiedTime(updatedAt);
                  })
                  .catch((error) => {
                    console.error("Audio play error:", error);
                  });
              }
            }
          });
        }
      });
    });
  }, [recceData, dispatch, audio, lastNotifiedTime, notifications]);

  return (
    <>
      <Header audioRef={audio} />
      <div className="row m-auto containerPadding">
        <h2>Notifications</h2>

        {notifications?.flatMap((notification, index) => {
          let Logo = null;
          let bgColor = null;

          if (notification.text.includes("Recce")) {
            Logo = "R";
            bgColor = "c1";
          } else if (notification.text.includes("Design")) {
            Logo = "D";
            bgColor = "c2";
          } else if (notification.text.includes("Printing")) {
            Logo = "P";
            bgColor = "c3";
          } else if (notification.text.includes("Fabrication")) {
            Logo = "F";
            bgColor = "c4";
          } else if (notification.text.includes("Installation")) {
            Logo = "I";
            bgColor = "c5";
          }

          return (
            <div key={index} className="row">
              <div className="col-md-1 text-center">
                <div className="row">
                  <p
                    className={`col-md-8 poppinfnt logos bold fs-3 text-white ${bgColor}`}
                  >
                    {Logo}
                  </p>
                </div>
              </div>
              <p className="col-md-10 poppinfnt">
                {notification.text === "New notification"
                  ? null
                  : notification.text}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
