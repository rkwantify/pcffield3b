import * as React from "react";
import { ServiceProviderContext } from "./context";
import { DialogService } from "../viewmodels/DialogService";
import {
  DialogType,
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import { observer } from "mobx-react";
export class DialogView extends React.Component {
  context!: React.ContextType<typeof ServiceProviderContext>;
  render(): React.JSX.Element {
    const dialogService = this.context.get<DialogService>("DialogService");
    if (dialogService.isOpen) {
      throw new Error("Render crash");
    }
    return (
      <Dialog
        dialogContentProps={{
          type: DialogType.normal,
          title: dialogService.title,
          closeButtonAriaLabel: "Close",
          subText: dialogService.message,
        }}
        hidden={!dialogService.isOpen}
        onDismiss={dialogService.onCancelClicked}
      >
        <DialogFooter>
          <PrimaryButton onClick={dialogService.onOkClicked} text="Ok" />
          <DefaultButton
            onClick={dialogService.onCancelClicked}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
    );
  }
}
DialogView.contextType = ServiceProviderContext;
observer(DialogView);
