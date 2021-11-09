import { MeasurementRecord } from "../../../../shared";
import { Fragment, FunctionComponent } from "react";
import { ActionCardHeader, KeyValCardBody } from "jack-hermanson-component-lib";
import { Card } from "reactstrap";
import Moment from "moment";
import { millisecondToSecond } from "../../functions";

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
                        val: (
                            <Fragment>
                                {measurement.temperature.toFixed(1)} &#8457;
                            </Fragment>
                        ),
                    },
                    {
                        key: "Humidity",
                        val: (
                            <Fragment>
                                {(measurement.humidity * 100).toFixed(1)} %
                            </Fragment>
                        ),
                    },
                    {
                        key: "Generated",
                        val: Moment(measurement.generated)
                            .local()
                            .format("h:mm:ss a"),
                    },
                    {
                        key: "Received Delay",
                        val: `${millisecondToSecond(
                            Moment(measurement.created).toDate().getTime() -
                                Moment(measurement.generated).toDate().getTime()
                        )} seconds`,
                    },
                ]}
            />
        </Card>
    );
};
