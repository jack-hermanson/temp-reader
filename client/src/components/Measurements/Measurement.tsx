import { MeasurementRecord } from "../../../../shared";
import { Fragment, FunctionComponent } from "react";
import { KeyValTable } from "jack-hermanson-component-lib";
import Moment from "moment";
import { millisecondToSecond } from "../../functions";

interface Props {
    measurement: MeasurementRecord;
}

export const Measurement: FunctionComponent<Props> = ({
    measurement,
}: Props) => {
    return (
        <tr>
            <td>{measurement.temperature.toFixed(1)} &#8457;</td>
            <td>{(measurement.humidity * 100).toFixed(1)} %</td>
            <td>{Moment(measurement.generated).local().format("h:mm:ss a")}</td>
            <td>
                {millisecondToSecond(
                    Moment(measurement.created).toDate().getTime() -
                        Moment(measurement.generated).toDate().getTime()
                )}{" "}
                seconds
            </td>
        </tr>
    );
};
