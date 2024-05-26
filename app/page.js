"use client"
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const channel = pusher.subscribe('my-channel');

    channel.bind('my-event', data => {

        console.log(data);

      setNotifications([...notifications, data]);
    });

    return () => {
      pusher.unsubscribe('my-channel');
    };
  }, [notifications]);

  return (
      <div>
        <h2>Notifications</h2>
        <ul>
          {JSON.stringify(notifications)}
        </ul>
      </div>
  );
};

export default Notifications;