import {
  ControlContextService,
  ParametersChangedEventArgs,
  ServiceProvider,
} from "pcf-react";
import { IInputs } from "../generated/ManifestTypes";
import { action, decorate, observable } from "mobx";

export class CompositeControlVM {
  serviceProvider: ServiceProvider;
  controlContext: ControlContextService;
  optionSetFieldOptions:
    | ComponentFramework.PropertyHelper.OptionMetadata[]
    | undefined;
  textField: string | null = null;
  optionSetField: number | null = null;
  optionSetFieldRequired: boolean;

  constructor(serviceProvider: ServiceProvider) {
    this.serviceProvider = serviceProvider;
    this.controlContext = serviceProvider.get<ControlContextService>(
      ControlContextService.serviceProviderName
    );
    this.controlContext.onLoadEvent.subscribe(this.onLoad);
    this.controlContext.onParametersChangedEvent.subscribe(
      this.onInParametersChanged
    );
  }

  // #region Actions
  onLoad(): void {
    this.optionSetFieldOptions =
      this.controlContext.getParameters<IInputs>().optionSetField.attributes?.Options;
    this.optionSetFieldRequired =
      this.controlContext.getParameters<IInputs>().optionSetField.attributes
        ?.RequiredLevel == 2;
  }

  onInParametersChanged(
    context: ControlContextService,
    args: ParametersChangedEventArgs
  ) {
    for (const param of args.updated) {
      switch (param) {
        case "textField":
          this.textField = args.values[param] as string | null;
          break;
        case "optionSetField":
          this.optionSetField = args.values[param] as number | null;
          break;
      }
    }
  }

  onTextFieldChanged(value: string | null): void {
    this.textField = value;
    this.controlContext.setParameters({
      textField: value,
    });
  }

  onOptionSetFieldChanged(value: number | null): void {
    this.optionSetField = value;
    if (value == 0) {
      this.textField = "Some other value (onOptionSetFieldChanged)";
    }
    this.controlContext.setParameters({
      optionSetField: value,
      textField: this.textField,
    });
  }
  // #endregion
}

decorate(CompositeControlVM, {
  textField: observable,
  optionSetField: observable,
  onLoad: action.bound,
  onOptionSetFieldChanged: action.bound,
  onTextFieldChanged: action.bound,
  onInParametersChanged: action.bound,
});
