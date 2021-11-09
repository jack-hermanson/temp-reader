import {
    action,
    Action,
    createStore,
    createTypedHooks,
    thunk,
    Thunk,
} from "easy-peasy";
import { MeasurementRecord } from "../../shared";
import axios from "axios";

export interface StoreModel {
    measurements: MeasurementRecord[] | undefined;
    setMeasurements: Action<StoreModel, MeasurementRecord[]>;
    loadMeasurements: Thunk<StoreModel>;
}

export const store = createStore<StoreModel>({
    measurements: undefined,
    setMeasurements: action((state, payload) => {
        state.measurements = payload;
    }),
    loadMeasurements: thunk(async actions => {
        try {
            const response = await axios.get<MeasurementRecord[]>(
                "/api/measurements"
            );
            const measurements = response.data;
            actions.setMeasurements(measurements);
        } catch (error) {
            console.error(error);
        }
    }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
