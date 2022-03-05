import { Config } from "../types";
import { PartialDeep } from "type-fest";

export const mergeConfig = (
  base: Config,
  ...additionalConfigs: Array<PartialDeep<Config>>
): Config =>
  additionalConfigs.reduce<Config>((agg, config) => {
    return {
      ...agg,
      ...config,
      propertyMap: {
        ...agg.propertyMap,
        ...config.propertyMap,
      },
    };
  }, base);
