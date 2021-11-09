import { Fragment, useEffect, FunctionComponent } from "react";
import { io, Socket } from "socket.io-client";

export const SocketConnection: FunctionComponent = () => {
    useEffect(() => {
        const socket: Socket = io("/");

        socket.on("connect", () => {
            console.log("Socket connected on front end.");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected on front end.");
        });
    });

    return <Fragment />;
};
