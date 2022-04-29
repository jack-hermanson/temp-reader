import { FunctionComponent } from "react";
import { MeasurementRecord } from "../../../../shared";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useStoreState } from "../../store";

interface Props {
    measurement: MeasurementRecord;
}

export const FirstMeasurement: FunctionComponent<Props> = ({
    measurement,
}: Props) => {
    const averageTemp = useStoreState(state => state.averageTemp);

    return (
        <Card className="mb-3">
            <CardBody>
                <Row>
                    <Col
                        xs={12}
                        lg={6}
                        className="mb-2 mb-lg-0 border-right-bottom"
                    >
                        <h1 className="display-1 text-center text-lg-end me-lg-2 mb-2 mb-lg-0">
                            {measurement.temperature.toFixed(1)} &#8457; cur.
                        </h1>
                    </Col>
                    <Col xs={12} lg={6}>
                        <h1 className="display-1 mb-0 text-center text-lg-start">
                            {/*{(measurement.humidity * 100).toFixed(1)} %*/}
                            {averageTemp && <>{averageTemp} &#8457; avg.</>}
                        </h1>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};
