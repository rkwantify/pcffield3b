import * as React from "react";
import { ServiceProvider } from "pcf-react";
import { CompositeControlVM } from "../viewmodels/CompositeControlVM";
import { ServiceProviderContext } from "./context";
import {
  Stack,
  IconButton,
  Callout,
  mergeStyleSets,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import { TextInput } from "./pcf-fluent-ui/TextInput";
import { OptionSetInput } from "./pcf-fluent-ui/OptionSetInput";
import { observer } from "mobx-react";
import { DialogService } from "../viewmodels/DialogService";
import { DialogView } from "./DialogView";
export interface PCFFieldControlProps {
  controlWidth?: number;
  controlHeight?: number;
  serviceProvider: ServiceProvider;
}
export interface PCFFieldControlState {
  hasError: boolean;
}

const styles = mergeStyleSets({
  searchButton: {},
  callout: { width: 300, padding: "16px" },
});

export class PCFFieldControl extends React.Component<
  PCFFieldControlProps,
  PCFFieldControlState
> {
  vm: CompositeControlVM;
  dialogService: DialogService;
  constructor(props: PCFFieldControlProps) {
    super(props);
    this.vm = props.serviceProvider.get<CompositeControlVM>("ViewModel");
    this.dialogService =
      props.serviceProvider.get<DialogService>("DialogService");
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any): PCFFieldControlState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render(): React.JSX.Element {
    const {
      textField,
      onTextFieldChanged,
      optionSetField,
      onOptionSetFieldChanged,
      optionSetFieldOptions,
      optionSetFieldRequired,
      onShowPopup,
    } = this.vm;
    return this.state.hasError ? (
      <>Error</>
    ) : (
      <ServiceProviderContext.Provider value={this.props.serviceProvider}>
        <Stack wrap horizontal tokens={{ maxWidth: 400 }}>
          <Stack.Item grow>
            <TextInput
              value={textField}
              onChange={onTextFieldChanged}
            ></TextInput>
          </Stack.Item>
          <Stack.Item grow>
            {this.props.controlWidth && this.props.controlWidth > 360 ? (
              <OptionSetInput
                value={optionSetField}
                onChange={onOptionSetFieldChanged}
                options={optionSetFieldOptions}
                showBlank={!optionSetFieldRequired}
              ></OptionSetInput>
            ) : (
              <div className={styles.searchButton}>
                <IconButton
                  iconProps={{ iconName: "Search" }}
                  onClick={onShowPopup}
                />
              </div>
            )}
          </Stack.Item>
          <IconButton
            iconProps={{ iconName: "FullScreen" }}
            onClick={this.vm.onToggleFullScreen}
          ></IconButton>
        </Stack>
        {this.vm.isPopupVisible && (
          <Callout
            target={`.${styles.searchButton}`}
            className={styles.callout}
            onDismiss={this.vm.onDismissPopup}
          >
            <OptionSetInput
              value={optionSetField}
              onChange={onOptionSetFieldChanged}
              options={optionSetFieldOptions}
              showBlank={!optionSetFieldRequired}
            ></OptionSetInput>
            <IconButton
              iconProps={{ iconName: "CheckMark" }}
              onClick={this.vm.onDismissPopup}
            />
          </Callout>
        )}

        <DialogView />
      </ServiceProviderContext.Provider>
    );
  }
}

observer(PCFFieldControl);
