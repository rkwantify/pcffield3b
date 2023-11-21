import * as React from "react";
import { ServiceProvider } from "pcf-react";
import { CompositeControlVM } from "../viewmodels/CompositeControlVM";
import { Stack } from "@fluentui/react";
import { TextInput } from "./pcf-fluent-ui/TextInput";
import { OptionSetInput } from "./pcf-fluent-ui/OptionSetInput";
import { ServiceProviderContext } from "./context";
import { observer } from "mobx-react";

export interface PCFFieldControlProps {
  controlWidth?: number;
  controlHeight?: number;
  serviceProvider: ServiceProvider;
}

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
    } = this.vm;
    return (
      <ServiceProviderContext.Provider value={this.props.serviceProvider}>
        <Stack>
          <TextInput
            value={textField}
            onChange={onTextFieldChanged}
          ></TextInput>
          <OptionSetInput
            value={optionSetField}
            onChange={onOptionSetFieldChanged}
            options={optionSetFieldOptions}
            showBlank={!optionSetFieldRequired}
          ></OptionSetInput>
        </Stack>
      </ServiceProviderContext.Provider>
    );
  }
}

observer(PCFFieldControl);
