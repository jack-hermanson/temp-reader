import React, { Fragment } from "react";
import "./css/main.css";
import { Layout } from "./components/Layout/Layout";
import { SocketConnection } from "./components/Utils/SocketConnection";
import { Col, Row } from "reactstrap";
import { Measurements } from "./components/Measurements/Measurements";

export const App: React.FC = () => {
    return (
        <Fragment>
            <SocketConnection />
            <Layout>
                <Row>
                    <Col>
                        <Measurements />
                    </Col>
                </Row>
            </Layout>
        </Fragment>
    );
};
