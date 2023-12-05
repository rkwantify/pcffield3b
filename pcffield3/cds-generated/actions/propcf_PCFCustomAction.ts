/* eslint-disable*/
import { WebApiExecuteRequest } from "cdsify";
import { StructuralProperty } from "cdsify";
import { OperationType } from "cdsify";

// Action propcf_PCFCustomAction
export const propcf_PCFCustomActionMetadata = {
  boundParameter: "entity",
  parameterTypes: {
    "entity": {
      typeName: "mscrm.pcf_pcftesterentity",
      structuralProperty: StructuralProperty.EntityType
      },		
      "Notes": {
      typeName: "Edm.String",
      structuralProperty: StructuralProperty.PrimitiveType
      },		
  
  },
  operationType: OperationType.Action,
  operationName: "propcf_PCFCustomAction"
};

export interface propcf_PCFCustomActionRequest extends WebApiExecuteRequest {
  entity?: import("cdsify").EntityReference | import("../entities/pcf_PCFTesterEntity").pcf_PCFTesterEntity;
  Notes?: string;
}