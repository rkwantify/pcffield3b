import { ServiceProvider, ControlContextService } from "pcf-react";
import { CompositeControlVM } from "../CompositeControlVM";
import { DialogService } from "../DialogService";

test("setFacebook", async () => {
  const serviceProvider = new ServiceProvider();
  const controlContext = new ControlContextService();
  const dialogService = new DialogService();

  controlContext.setParameters = jest.fn();
  serviceProvider.register(ControlContextService.serviceProviderName, controlContext);
  serviceProvider.register("DialogService", dialogService);

  dialogService.showDialog = jest.fn().mockReturnValue("ok");
  const vm = new CompositeControlVM(serviceProvider);

  await vm.onOptionSetFieldChanged(1);

  expect(dialogService.showDialog).toBeCalledTimes(1);
  expect(vm.textField).toBe("Facebook");
});
