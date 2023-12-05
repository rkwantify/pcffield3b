/* eslint-disable*/
import { pcf_pcftesterentityMetadata } from "./entities/pcf_PCFTesterEntity";
import { propcf_PCFCustomActionMetadata } from "./actions/propcf_PCFCustomAction";

export const Entities = {
  pcf_PCFTesterEntity: "pcf_pcftesterentity",
};

// Setup Metadata
// Usage: setMetadataCache(metadataCache);
export const metadataCache = {
  entities: {
    pcf_pcftesterentity: pcf_pcftesterentityMetadata,
  },
  actions: {
    propcf_PCFCustomAction: propcf_PCFCustomActionMetadata,
  }
};