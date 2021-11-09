import { FunctionComponent } from "react";
import { useStoreState } from "../../store";
import { LoadingSpinner } from "jack-hermanson-component-lib";
import { Measurement } from "./Measurement";

export const Measurements: FunctionComponent = () => {
    const measurements = useStoreState(state => state.measurements);

    return (
        <div>
            {measurements ? (
                <div>
                    {measurements.map(measurement => (
                        <Measurement
                            measurement={measurement}
                            key={measurement.id}
                        />
                    ))}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};
