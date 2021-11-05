import React from "react";
import "./css/main.css";
import { Layout } from "./components/Layout/Layout";

export const App: React.FC = () => {
    return (
        <Layout>
            <p>This is part of the app</p>
        </Layout>
    );
};
