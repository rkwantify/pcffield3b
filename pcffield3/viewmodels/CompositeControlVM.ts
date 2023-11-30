import {
  ControlContextService,
  ParametersChangedEventArgs,
  ServiceProvider,
} from "pcf-react";
import { IInputs } from "../generated/ManifestTypes";
import { action, decorate, observable } from "mobx";
import { DialogService } from "./DialogService";
import { CdsService } from "../cdsservice/CdsService";

export class CompositeControlVM {
  serviceProvider: ServiceProvider; // from Drurow pcf-react
  controlContext: ControlContextService; // from Drurow pcf-react
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

  // #region Actions
  onLoad(): void {
    this.optionSetFieldOptions =
      this.controlContext.getParameters<IInputs>().optionSetField.attributes?.Options;
    console.dir(this.optionSetFieldOptions);
    this.optionSetFieldRequired =
      this.controlContext.getParameters<IInputs>().optionSetField.attributes
        ?.RequiredLevel == 2;

    this.controlContext.onFullScreenModeChangedEvent.subscribe(
      this.onToggleFullScreen
    );
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

  async onOptionSetFieldChanged(value: number | null): Promise<void> {
    try {
      this.optionSetField = value;
      if (value == 0) {
        // "Other" from `optionSetField.attributes.Options`
        const response = await this.controlContext.showConfirmDialog({
          text: "Are you sure? (confirm string)",
        });

        if (response.confirmed) {
          this.textField = "(response.confirmed is true)";
        }
        // Facebook
      } else if (value === 1) {
        // "Facebook"
        const dialogService =
          this.serviceProvider.get<DialogService>("DialogService");

        const cdsService = this.serviceProvider.get<CdsService>("CdsService");
        const existingRecord = cdsService.getRecordById(
          this.controlContext.getPrimaryId().id
        );

        const response = await dialogService.showDialog(
          "Confirm",
          "Are you sure? (PCF context.navigation dialog)"
        );
        if (response == "ok") {
          this.textField = "Facebook";
          throw new Error("Somethign happened!!!");
        }
      }

      this.controlContext.setParameters({
        optionSetField: value,
        textField: this.textField,
      });
    } catch (ex) {
      this.controlContext?.showErrorDialog(ex as Error);
    }
  }

  onShowPopup(): void {
    this.isPopupVisible = true;
    console.log("onShowPopup");
  }
  onDismissPopup(): void {
    console.log("onDismissPopup");
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
  // #endregion
}

decorate(CompositeControlVM, {
  textField: observable,
  optionSetField: observable,
  isPopupVisible: observable,
  onLoad: action.bound,
  onOptionSetFieldChanged: action.bound,
  onTextFieldChanged: action.bound,
  onInParametersChanged: action.bound,
  onShowPopup: action.bound,
  onDismissPopup: action.bound,
  isFullScreen: observable,
  onFullScreenChanged: action.bound,
  onToggleFullScreen: action.bound,
});
