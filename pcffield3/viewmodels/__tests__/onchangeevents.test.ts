import { ServiceProvider, ControlContextService } from "pcf-react";
import { CompositeControlVM } from "../CompositeControlVM";
import { IOutputs, IInputs } from "../../generated/ManifestTypes";

test("onchangeEvents", () => {
  const serviceProvider = new ServiceProvider();
  const controlContext = new ControlContextService();
  controlContext.setParameters = jest.fn();
  serviceProvider.register(
    ControlContextService.serviceProviderName,
    controlContext
  );
  controlContext.getParameters = jest.fn().mockReturnValue({
    optionSetField: {
      attributes: {
        Options: [
          {
            Label: "Option 1",
            Value: 1,
          },
        ],
      },
    },
  } as IInputs);

  const vm = new CompositeControlVM(serviceProvider);
  vm.onLoad();

  vm.onInParametersChanged(controlContext, {
    updated: ["textField"],
    values: { textField: "foo" },
  });
  expect(vm.textField).toBe("foo");

  //
  vm.onTextFieldChanged("bar");

  expect(controlContext.setParameters).toBeCalledWith(
    expect.objectContaining<IOutputs>({
      textField: "bar",
    })
  );
});
