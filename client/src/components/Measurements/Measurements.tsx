import { Fragment, FunctionComponent } from "react";
import { useStoreState } from "../../store";
import { LoadingSpinner } from "jack-hermanson-component-lib";
import { Measurement } from "./Measurement";
import { Table } from "reactstrap";
import { FirstMeasurement } from "./FirstMeasurement";
import { Row, Col } from "reactstrap";

export const Measurements: FunctionComponent = () => {
    const measurements = useStoreState(state => state.measurements);

    return (
        <Fragment>
            <Row>
                <Col>{renderFirstMeasurement()}</Col>
            </Row>
            <Row>
                <Col>{renderTable()}</Col>
            </Row>
        </Fragment>
    );

    function renderFirstMeasurement() {
        if (measurements && measurements.length) {
            return <FirstMeasurement measurement={measurements[0]} />;
        }
    }

    function renderTable() {
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>Temp</th>
                        <th>Humidity</th>
                        <th>Generated</th>
                        <th>Delay</th>
                    </tr>
                </thead>
                {measurements ? (
                    <tbody>
                        {measurements.slice(1).map(measurement => (
                            <Measurement
                                measurement={measurement}
                                key={measurement.id}
                            />
                        ))}
                    </tbody>
                ) : (
                    <LoadingSpinner />
                )}
            </Table>
        );
    }
};
