/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ITextFieldProps, TextField } from "office-ui-fabric-react";
import * as React from "react";

export interface TextInputProps {
  label?: string;
  textFieldProps?: ITextFieldProps;
  maxLength?: number;
  value: string | null;
  onChange: (newValue: string | null) => void;
}
export interface TextInputState {
  textValue: string;
}
export class TextInput extends React.Component<TextInputProps, TextInputState> {
  private isEditing = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: TextInputProps) {
    super(props);
    this.state = {
      textValue: this.props.value || "",
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange = (event: any, newValue?: string | undefined) => {
    this.setState({
      textValue: newValue || "",
    });

    this.isEditing = true;
  };

  onBlur = () => {
    if (!this.isEditing) return;

    this.isEditing = false;
    if (this.props.onChange) this.props.onChange(this.state.textValue);
  };

  render() {
    const { textValue } = this.state;
    const { label, value } = this.props;

    return (
      <TextField
        placeholder="---"
        label={label}
        value={this.isEditing ? textValue : (value as string)}
        onBlur={this.onBlur}
        onChange={this.onChange}
        {...this.props.textFieldProps}
      ></TextField>
    );
  }
}
