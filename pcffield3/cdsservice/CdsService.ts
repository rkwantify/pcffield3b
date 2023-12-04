// import { pcf_pcftesterentityMetadata, pcf_PCFTesterEntity } from "../cds-generated/entities/pcf_PCFTesterEntity";
// import { sdkify, odataify, EntityReference } from "cdsify";
// import {
//   propcf_PCFCustomActionRequest,
//   propcf_PCFCustomActionMetadata,
// } from "../cds-generated/actions/propcf_PCFCustomAction";
// import { propcf_PCFCustomActionResponse } from "../cds-generated/complextypes/propcf_PCFCustomActionResponse";

// /* eslint-disable @typescript-eslint/camelcase */
export class CdsService {
  context: ComponentFramework.Context<unknown>;
  constructor(context?: ComponentFramework.Context<unknown>) {
    if (context) {
      this.context = context;
    }
  }
  async getRecordById(id: string): Promise<any> {
    const record = await this.context.webAPI.retrieveRecord(
      "pcf_pcftester",
      id
    );
    await console.log("record", record);
    // const result = await this.context.webAPI.retrieveRecord(pcf_pcftesterentityMetadata.logicalName, id);
    // return sdkify<pcf_PCFTesterEntity>(result, pcf_pcftesterentityMetadata.logicalName) as Promise<pcf_PCFTesterEntity>;
  }
  async markComplete(id: string, date: Date | null): Promise<void> {
    // if (!date) throw new Error("date is required");
    // const localOffset = date.getTimezoneOffset();
    // const offset = this.context.userSettings.getTimeZoneOffsetMinutes(date);
    // date = new Date(date.getTime() - (offset + localOffset) * 60000);
    // const update = {
    //   logicalName: pcf_pcftesterentityMetadata.logicalName,
    //   id: id,
    //   pcf_dateandtimefield: date,
    // } as pcf_PCFTesterEntity;
    // const record = await odataify("Update", update);
    // await this.context.webAPI.updateRecord(pcf_pcftesterentityMetadata.logicalName, id, record);
    // const request = {
    //   logicalName: propcf_PCFCustomActionMetadata.operationName,
    //   entity: new EntityReference(pcf_pcftesterentityMetadata.logicalName, id),
    //   Notes: "foo",
    // } as propcf_PCFCustomActionRequest;
    // const odataRequest = await odataify("Action", request);
    // const response = await (this.context.webAPI as any).execute(odataRequest);
    // const actionResponse = JSON.parse(await response.text()) as propcf_PCFCustomActionResponse;
    // console.log(actionResponse.Result);
  }
}
