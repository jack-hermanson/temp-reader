import React, { Fragment } from "react";
import "./css/main.css";
import { Layout } from "./components/Layout/Layout";
import { SocketConnection } from "./components/Utils/SocketConnection";

export const App: React.FC = () => {
    return (
        <Fragment>
            <SocketConnection />
            <Layout>
                <p>This is part of the app</p>
            </Layout>
        </Fragment>
    );
};
