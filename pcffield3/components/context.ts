import * as React from "react";
import { ServiceProvider } from "pcf-react";

export const ServiceProviderContext = React.createContext<ServiceProvider>(new ServiceProvider());
