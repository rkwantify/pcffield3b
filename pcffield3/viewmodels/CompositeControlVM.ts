import {
  ServiceProvider,
  ControlContextService,
  ParametersChangedEventArgs,
} from "pcf-react";
import { IInputs } from "../generated/ManifestTypes";
import { decorate, observable, action } from "mobx";
import { DialogService } from "./DialogService";
import { CdsService } from "../cdsservice/CdsService";
export class CompositeControlVM {
  serviceProvider: ServiceProvider;
  controlContext: ControlContextService;
  optionSetFieldOptions:
    | ComponentFramework.PropertyHelper.OptionMetadata[]
    | undefined;
  textField: string | null = null;
  optionSetField: number | null = null;
  optionSetFieldRequired: boolean;
  isPopupVisible = false;
  isFullScreen = false;

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
  onLoad(): void {
    this.controlContext.onFullScreenModeChangedEvent.subscribe(
      this.onFullScreenChanged
    );
    this.optionSetFieldOptions =
      this.controlContext.getParameters<IInputs>().optionSetField.attributes?.Options;
    this.optionSetFieldRequired =
      this.controlContext.getParameters<IInputs>().optionSetField.attributes
        ?.RequiredLevel == 2;
  }
  onInParametersChanged(
    context: ControlContextService,
    args: ParametersChangedEventArgs
  ): void {
    for (const param of args.updated) {
      switch (param) {
        case "textField":
          this.textField = args.values[param] as string | null;
          break;
        case "optionSetField":
          this.optionSetField = args.values[param] as number | null;
      }
    }
  }

  onTextFieldChanged(value: string | null): void {
    this.textField = value;
    this.controlContext.setParameters({
      textField: value,
    });
  }
  async onOptionSetFieldChanged(value: number | null): Promise<void> {
    try {
      this.optionSetField = value;
      if (value == 0) {
        const response = await this.controlContext.showConfirmDialog({
          text: "Are you sure?",
        });
        if (response.confirmed) {
          this.textField = "Other";
        }
      } else if (value == 1) {
        const dialogService =
          this.serviceProvider.get<DialogService>("DialogService");

        const cdsService = this.serviceProvider.get<CdsService>("CdsService");
        const existingService = await cdsService.getRecordById(
          this.controlContext.getPrimaryId().id
        );

        const response = await dialogService.showDialog(
          "Confirm",
          "Are you sure?"
        );
        if (response == "ok") {
          this.textField = "Facebook";
        }
      }

      this.controlContext.setParameters({
        optionSetField: value,
        textField: this.textField,
      });
    } catch (ex) {
      this.controlContext.showErrorDialog(ex as Error);
    }
  }

  onShowPopup(): void {
    this.isPopupVisible = true;
  }
  onDismissPopup(): void {
    this.isPopupVisible = false;
  }
  onToggleFullScreen(): void {
    this.isPopupVisible = false;
    this.isFullScreen = !this.isFullScreen;
    this.controlContext.fullScreen(this.isFullScreen);
  }
  onFullScreenChanged(
    context: ControlContextService,
    fullscreen: boolean
  ): void {
    this.isFullScreen = fullscreen;
  }
}

decorate(CompositeControlVM, {
  textField: observable,
  optionSetField: observable,
  onLoad: action.bound,
  onOptionSetFieldChanged: action.bound,
  onTextFieldChanged: action.bound,
  onInParametersChanged: action.bound,
  isPopupVisible: observable,
  onShowPopup: action.bound,
  onDismissPopup: action.bound,
  isFullScreen: observable,
  onFullScreenChanged: action.bound,
  onToggleFullScreen: action.bound,
});
