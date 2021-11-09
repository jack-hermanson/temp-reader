import { MeasurementRecord } from "../../../../shared";
import { FunctionComponent } from "react";
import { ActionCardHeader, KeyValCardBody } from "jack-hermanson-component-lib";
import { Card } from "reactstrap";
import Moment from "moment";

interface Props {
    measurement: MeasurementRecord;
}

export const Measurement: FunctionComponent<Props> = ({
    measurement,
}: Props) => {
    return (
        <Card className="mb-3 no-mb-last">
            <ActionCardHeader title={`Measurement #${measurement.id}`} />
            <KeyValCardBody
                keyValPairs={[
                    {
                        key: "Temperature",
                        val: measurement.temperature,
                    },
                    {
                        key: "Humidity",
                        val: measurement.humidity,
                    },
                    {
                        key: "Generated",
                        val: Moment(measurement.generated).fromNow(),
                    },
                    {
                        key: "Received",
                        val: Moment(measurement.generated).fromNow(),
                    },
                ]}
            />
        </Card>
    );
};
