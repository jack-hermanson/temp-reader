import { Fragment, useEffect, FunctionComponent } from "react";
import { io, Socket } from "socket.io-client";
import { SocketEvent } from "../../../../shared";
import { useStoreActions } from "../../store";

export const SocketConnection: FunctionComponent = () => {
    const loadMeasurements = useStoreActions(
        actions => actions.loadMeasurements
    );
    const loadAverageTemp = useStoreActions(actions => actions.loadAverageTemp);
    const loadTotalCount = useStoreActions(actions => actions.loadTotalCount);

    useEffect(() => {
        const socket: Socket = io("/");

        socket.on("connect", () => {
            console.log("Socket connected on front end.");
            loadMeasurements();
            loadAverageTemp();
            loadTotalCount();
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected on front end.");
        });

        socket.on(SocketEvent.NEW_MEASUREMENT, () => {
            console.log("New measurement");
            loadMeasurements();
            loadAverageTemp();
            loadTotalCount();
        });
    });

    return <Fragment />;
};
