import * as React from "react";
import { TextField } from "@fluentui/react";

export interface TextInputProps {
  value: string | null;
  onChange: (newValue: string | null) => void;
  readOnly?: boolean;
  masked?: boolean;
}
export interface TextInputState {
  textValue: string;
}

export class PCFFieldControl extends React.Component<
  TextInputProps,
  TextInputState
> {
  private isEditing = false;

  constructor(props: TextInputProps) {
    super(props);
    this.state = {
      textValue: props.value ?? "",
    };
  }

  onChange = (_event: unknown, newValue?: string | undefined): void => {
    this.isEditing = true;
    this.setState({
      textValue: newValue || "",
    });
  };

  onBlur = (): void => {
    if (!this.isEditing) return;
    this.isEditing = false;
    if (this.props.onChange) this.props.onChange(this.state.textValue);
  };

  render(): JSX.Element {
    const { textValue } = this.state;
    const { value, readOnly, masked } = this.props;
    return masked ? (
      <strong>*****</strong>
    ) : (
      <>
        <TextField
          placeholder="---"
          disabled={readOnly}
          value={this.isEditing ? textValue : (value as string)}
          onBlur={this.onBlur}
          onChange={this.onChange}
        ></TextField>
      </>
    );
  }
}
