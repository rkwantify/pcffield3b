import * as React from "react";
import { ServiceProvider } from "pcf-react";
import { CompositeControlVM } from "../viewmodels/CompositeControlVM";
import { Callout, IconButton, Stack, mergeStyleSets } from "@fluentui/react";
import { TextInput } from "./pcf-fluent-ui/TextInput";
import { OptionSetInput } from "./pcf-fluent-ui/OptionSetInput";
import { ServiceProviderContext } from "./context";
import { observer } from "mobx-react";

export interface PCFFieldControlProps {
  controlWidth?: number;
  controlHeight?: number;
  serviceProvider: ServiceProvider;
}

const styles = mergeStyleSets({
  searchButton: {},
  callout: { width: 300, padding: "16px" },
});

export class PCFFieldControl extends React.Component<PCFFieldControlProps> {
  vm: CompositeControlVM;

  constructor(props: PCFFieldControlProps) {
    super(props);
    this.vm = props.serviceProvider.get<CompositeControlVM>("ViewModel");
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
    return (
      <ServiceProviderContext.Provider value={this.props.serviceProvider}>
        <Stack wrap horizontal tokens={{ maxWidth: 400 }}>
          {/* <Stack.Item>
            {this.props.controlWidth} x{" "}
            {this.props.controlHeight ?? "undefined"}``
          </Stack.Item> */}
          {/* <Stack.Item>{`isPopupVisible: ${this.vm.isPopupVisible}`}</Stack.Item> */}
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
      </ServiceProviderContext.Provider>
    );
  }
}

observer(PCFFieldControl);
