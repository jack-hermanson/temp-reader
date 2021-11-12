import { FunctionComponent } from "react";
import { useStoreState } from "../../store";
import { LoadingSpinner } from "jack-hermanson-component-lib";
import { Measurement } from "./Measurement";
import { Table } from "reactstrap";

export const Measurements: FunctionComponent = () => {
    const measurements = useStoreState(state => state.measurements);

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
                    {measurements.map(measurement => (
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
};
