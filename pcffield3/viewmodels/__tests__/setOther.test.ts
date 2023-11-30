import { ServiceProvider, ControlContextService } from "pcf-react";
import { CompositeControlVM } from "../CompositeControlVM";

test("setOther", async () => {
  const serviceProvider = new ServiceProvider();
  const controlContext = new ControlContextService();
  controlContext.setParameters = jest.fn();
  serviceProvider.register(ControlContextService.serviceProviderName, controlContext);
  controlContext.showConfirmDialog = jest.fn().mockReturnValue({
    confirmed: true,
  } as ComponentFramework.NavigationApi.ConfirmDialogResponse);
  const vm = new CompositeControlVM(serviceProvider);
  await vm.onOptionSetFieldChanged(0);
  expect(controlContext.showConfirmDialog).toBeCalledTimes(1);
  expect(vm.textField).toBe("Other");

  vm.textField = "Foo";
  controlContext.showConfirmDialog = jest.fn().mockReturnValue({
    confirmed: false,
  } as ComponentFramework.NavigationApi.ConfirmDialogResponse);
  await vm.onOptionSetFieldChanged(0);
  expect(controlContext.showConfirmDialog).toBeCalledTimes(1);
  expect(vm.textField).toBe("Foo");
});
