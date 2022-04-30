import { Fragment, FunctionComponent } from "react";
import { useStoreActions, useStoreState } from "../../store";
import { LoadingSpinner } from "jack-hermanson-component-lib";
import { Measurement } from "./Measurement";
import { Button, Table } from "reactstrap";
import { FirstMeasurement } from "./FirstMeasurement";
import { Row, Col } from "reactstrap";

export const Measurements: FunctionComponent = () => {
    const measurements = useStoreState(state => state.measurements);
    const count = useStoreState(state => state.totalCount);
    const skip = useStoreState(state => state.skip);

    const setSkip = useStoreActions(actions => actions.setSkip);
    const loadMoreMeasurements = useStoreActions(
        actions => actions.loadMoreMeasurements
    );

    return (
        <Fragment>
            <Row>
                <Col>{renderFirstMeasurement()}</Col>
            </Row>
            <Row>
                <Col>{renderTable()}</Col>
            </Row>
            {renderSkipTake()}
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
                        {/*<th>Humidity</th>*/}
                        <th>Generated</th>
                        <th>Delay</th>
                    </tr>
                </thead>
                {measurements ? (
                    <tbody>
                        {measurements.map(measurement => (
                            <Measurement
                                measurement={measurement}
                                key={measurement.id}
                            />
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                <LoadingSpinner />
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
        );
    }

    function renderSkipTake() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        Loaded {skip < count ? skip : count} of {count}
                    </Col>
                </Row>
                {skip < count && (
                    <Row>
                        <Col>
                            <Button color="secondary" onClick={loadMore}>
                                Load More
                            </Button>
                        </Col>
                    </Row>
                )}
            </Fragment>
        );
    }

    async function loadMore() {
        await loadMoreMeasurements(skip);
        setSkip(skip + 10);
    }
};
