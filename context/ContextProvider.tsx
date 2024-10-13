"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { Features, FeaturesValue } from "@/actions/types/fetchFlags";

// Define the shape of the state and action types
interface State {
  features: Features | null;
}

interface UpdateFeatureFlagAction {
  type: "UPDATE_FEATURE_FLAG";
  flagName: string;
  value: FeaturesValue;
}

interface SetFeaturesAction {
  type: "SET_INITIAL_FEATURES";
  value: Features | null;
}

type Action = SetFeaturesAction | UpdateFeatureFlagAction;

const initialState: State = {
  features: null,
};

// Add types for the context value
interface ContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

const Context = createContext<ContextValue | undefined>(undefined);
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_INITIAL_FEATURES":
      return { ...state, features: action.value }; // Set features from action
    case "UPDATE_FEATURE_FLAG":
      return {
        ...state,
        features: {
          ...state.features,
          [action.flagName]: action.value, // Update flag dynamically
        },
      }; // Set features from action
    default:
      return state;
  }
};

export function AppContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchConfigProxy", {
          method: "GET",
        });

        const fetchedData = await response.json(); // Fetch data
        // Dispatch action to set features in context state
        dispatch({ type: "SET_INITIAL_FEATURES", value: fetchedData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!state.features) fetchData();
  }, [state.features]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

// This method is to access context
export function useAppContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContext");
  }
  return context;
}
