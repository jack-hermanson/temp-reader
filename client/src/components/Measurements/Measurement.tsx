import { MeasurementRecord } from "../../../../shared";
import { FunctionComponent } from "react";
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
            <td>
                ({measurement.id}) {measurement.temperature.toFixed(1)} &#8457;
            </td>
            {/*<td>{(measurement.humidity * 100).toFixed(1)} %</td>*/}
            <td>
                {Moment(measurement.generated)
                    .local()
                    .format("ddd MM/DD/YYYY hh:mma")}
            </td>
            <td>
                {millisecondToSecond(
                    Moment(measurement.created).toDate().getTime() -
                        Moment(measurement.generated).toDate().getTime()
                ).toFixed(1)}{" "}
                seconds
            </td>
        </tr>
    );
};
