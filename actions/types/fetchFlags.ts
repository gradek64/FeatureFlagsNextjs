// Define the type for the "features" property
export interface Features {
  [key: string]: boolean | string | Array<Record<string, any>>;
}

// Define a new interface that maps the values of Features
export type FeaturesValue = Features[keyof Features];

// Define the full shape of the expected response
export interface ConfigResponse {
  features: Features;
}
