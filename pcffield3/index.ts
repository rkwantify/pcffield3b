import { StandardControlReact } from "pcf-react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { PCFFieldControl } from "./components/PCFFieldControl";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CompositeControlVM } from "./viewmodels/CompositeControlVM";
import { DialogService } from "./viewmodels/DialogService";
export class pcffield3 extends StandardControlReact<IInputs, IOutputs> {
  constructor() {
    super();
    this.renderOnParametersChanged = false;
    this.initServiceProvider = (serviceProvider): void => {
      serviceProvider.register(
        "ViewModel",
        new CompositeControlVM(serviceProvider)
      );
      serviceProvider.register("DialogService", new DialogService());
    };
    this.reactCreateElement = (
      container,
      width,
      height,
      serviceProvider
    ): void => {
      ReactDOM.render(
        React.createElement(PCFFieldControl, {
          serviceProvider: serviceProvider,
          controlWidth: width,
          controlHeight: height,
        }),
        container
      );
    };
  }
}
