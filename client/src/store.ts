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
    appendToMeasurements: Action<StoreModel, MeasurementRecord[]>;
    loadMoreMeasurements: Thunk<StoreModel, number>;
    averageTemp: number | undefined;
    setAverageTemp: Action<StoreModel, number>;
    loadAverageTemp: Thunk<StoreModel>;
    skip: number;
    setSkip: Action<StoreModel, number>;
    totalCount: number;
    setTotalCount: Action<StoreModel, number>;
    loadTotalCount: Thunk<StoreModel>;
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
            actions.setSkip(measurements.length);
        } catch (error) {
            console.error(error);
        }
    }),
    appendToMeasurements: action((state, payload) => {
        if (state.measurements) {
            state.measurements = [...state.measurements, ...payload];
        }
    }),
    loadMoreMeasurements: thunk(async (actions, skip) => {
        try {
            const response = await axios.get<MeasurementRecord[]>(
                "/api/measurements",
                {
                    params: {
                        skip,
                    },
                }
            );
            const newMeasurements = response.data;
            actions.appendToMeasurements(newMeasurements);
        } catch (error) {
            console.error(error);
        }
    }),
    averageTemp: undefined,
    setAverageTemp: action((state, payload) => {
        state.averageTemp = payload;
    }),
    loadAverageTemp: thunk(async actions => {
        try {
            const response = await axios.get<number>(
                "/api/measurements/average-temp"
            );
            const averageTemp = response.data;
            actions.setAverageTemp(averageTemp);
        } catch (error) {
            console.error(error);
        }
    }),
    skip: 0,
    setSkip: action((state, payload) => {
        state.skip = payload;
    }),
    totalCount: 0,
    setTotalCount: action((state, payload) => {
        state.totalCount = payload;
    }),
    loadTotalCount: thunk(async actions => {
        try {
            const response = await axios.get<number>("/api/measurements/count");
            const totalCount = response.data;
            actions.setTotalCount(totalCount);
        } catch (error) {
            console.error(error);
        }
    }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
