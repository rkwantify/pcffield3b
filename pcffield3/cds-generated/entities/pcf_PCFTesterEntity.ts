/* eslint-disable*/
import { IEntity } from "cdsify";
// Entity pcf_PCFTesterEntity
export const pcf_pcftesterentityMetadata = {
  typeName: "mscrm.pcf_pcftesterentity",
  logicalName: "pcf_pcftesterentity",
  collectionName: "pcf_pcftesterentities",
  primaryIdAttribute: "pcf_pcftesterentityid",
  attributeTypes: {
    // Numeric Types
    importsequencenumber: "Integer",
    pcf_decimalfield: "Decimal",
    pcf_integerfield: "Integer",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    pcf_optionsetfield: "Optionset",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
    pcf_dateandtimefield: "DateAndTime:UserLocal",
  },
  navigation: {
    pcf_LookupField: ["mscrm.pcf_pcftesterentity"],
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
  },
};

// Attribute constants
export enum pcf_PCFTesterEntityAttributes {
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ImportSequenceNumber = "importsequencenumber",
  ModifiedBy = "modifiedby",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  OverriddenCreatedOn = "overriddencreatedon",
  OwnerId = "ownerid",
  OwnerIdName = "owneridname",
  OwnerIdType = "owneridtype",
  OwnerIdYomiName = "owneridyominame",
  OwningBusinessUnit = "owningbusinessunit",
  OwningBusinessUnitName = "owningbusinessunitname",
  OwningTeam = "owningteam",
  OwningUser = "owninguser",
  pcf_DateAndTimeField = "pcf_dateandtimefield",
  pcf_DecimalField = "pcf_decimalfield",
  pcf_IntegerField = "pcf_integerfield",
  pcf_LookupField = "pcf_lookupfield",
  pcf_LookupFieldName = "pcf_lookupfieldname",
  pcf_Name = "pcf_name",
  pcf_OptionSetField = "pcf_optionsetfield",
  pcf_PCFTesterEntityId = "pcf_pcftesterentityid",
  pcf_TextField = "pcf_textfield",
  statecode = "statecode",
  statuscode = "statuscode",
  TimeZoneRuleVersionNumber = "timezoneruleversionnumber",
  UTCConversionTimeZoneCode = "utcconversiontimezonecode",
  VersionNumber = "versionnumber",
}

// Early Bound Interface
export interface pcf_PCFTesterEntity extends IEntity {
  // Created By LookupType Unique identifier of the user who created the record.
  createdby?: import("cdsify").EntityReference | null;
  //  StringType
  createdbyname?: string | null;
  //  StringType
  createdbyyominame?: string | null;
  // Created On DateTimeType Date and time when the record was created. DateAndTime:UserLocal
  createdon?: Date | null;
  // Created By (Delegate) LookupType Unique identifier of the delegate user who created the record.
  createdonbehalfby?: import("cdsify").EntityReference | null;
  //  StringType
  createdonbehalfbyname?: string | null;
  //  StringType
  createdonbehalfbyyominame?: string | null;
  // Import Sequence Number IntegerType Sequence number of the import that created this record.
  importsequencenumber?: number | null;
  // Modified By LookupType Unique identifier of the user who modified the record.
  modifiedby?: import("cdsify").EntityReference | null;
  //  StringType
  modifiedbyname?: string | null;
  //  StringType
  modifiedbyyominame?: string | null;
  // Modified On DateTimeType Date and time when the record was modified. DateAndTime:UserLocal
  modifiedon?: Date | null;
  // Modified By (Delegate) LookupType Unique identifier of the delegate user who modified the record.
  modifiedonbehalfby?: import("cdsify").EntityReference | null;
  //  StringType
  modifiedonbehalfbyname?: string | null;
  //  StringType
  modifiedonbehalfbyyominame?: string | null;
  // Record Created On DateTimeType Date and time that the record was migrated. DateOnly:UserLocal
  overriddencreatedon?: Date | null;
  // Owner OwnerType Owner Id
  ownerid?: import("cdsify").EntityReference | null;
  //  StringType Name of the owner
  owneridname?: string | null;
  //  EntityNameType Owner Id Type
  owneridtype?: string | null;
  //  StringType Yomi name of the owner
  owneridyominame?: string | null;
  // Owning Business Unit LookupType Unique identifier for the business unit that owns the record
  owningbusinessunit?: import("cdsify").EntityReference | null;
  //  StringType
  owningbusinessunitname?: string | null;
  // Owning Team LookupType Unique identifier for the team that owns the record.
  owningteam?: import("cdsify").EntityReference | null;
  // Owning User LookupType Unique identifier for the user that owns the record.
  owninguser?: import("cdsify").EntityReference | null;
  // DateAndTime Field DateTimeType DateAndTime:UserLocal
  pcf_dateandtimefield?: Date | null;
  // Decimal Field DecimalType
  pcf_decimalfield?: number | null;
  // Integer Field IntegerType
  pcf_integerfield?: number | null;
  // Lookup Field LookupType
  pcf_lookupfield?: import("cdsify").EntityReference | null;
  //  StringType
  pcf_lookupfieldname?: string | null;
  // Name [Required] StringType Required name field
  pcf_name?: string;
  // OptionSet Field socialprofile_community
  pcf_optionsetfield?: import("../enums/socialprofile_community").socialprofile_community | null;
  // PCF Tester Entity UniqueidentifierType Unique identifier for entity instances
  pcf_pcftesterentityid?: import("cdsify").Guid | null;
  // Text Field StringType
  pcf_textfield?: string | null;
  // Status pcf_pcftesterentity_pcf_pcftesterentity_statecode Status of the PCF Tester Entity
  statecode?: import("../enums/pcf_pcftesterentity_pcf_pcftesterentity_statecode").pcf_pcftesterentity_pcf_pcftesterentity_statecode | null;
  // Status Reason pcf_pcftesterentity_pcf_pcftesterentity_statuscode Reason for the status of the PCF Tester Entity
  statuscode?: import("../enums/pcf_pcftesterentity_pcf_pcftesterentity_statuscode").pcf_pcftesterentity_pcf_pcftesterentity_statuscode | null;
  // Time Zone Rule Version Number IntegerType For internal use only.
  timezoneruleversionnumber?: number | null;
  // UTC Conversion Time Zone Code IntegerType Time zone code that was in use when the record was created.
  utcconversiontimezonecode?: number | null;
  // Version Number BigIntType Version Number
  versionnumber?: number | null;
}
