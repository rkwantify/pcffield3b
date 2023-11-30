import { observable, decorate, action } from "mobx";
export type DialogServiceResult = "ok" | "cancel";
export class DialogService {
  isOpen = false;
  message = "";
  title = "";
  showDialogCallback: (result: DialogServiceResult) => void;
  showDialog(title: string, message: string): Promise<DialogServiceResult> {
    this.title = title;
    this.message = message;
    this.isOpen = true;

    return new Promise((resolve) => {
      this.showDialogCallback = resolve;
    });
  }
  onOkClicked(): void {
    this.isOpen = false;
    this.showDialogCallback("ok");
  }
  onCancelClicked(): void {
    this.isOpen = false;
    this.showDialogCallback("cancel");
  }
}

decorate(DialogService, {
  isOpen: observable,
  message: observable,
  title: observable,
  onOkClicked: action.bound,
  onCancelClicked: action.bound,
});
