import { SetupGlobalContext } from "cdsify/lib/cdsnode";

test("retrieve", async () => {
    await SetupGlobalContext();

    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        <entity name="pcf_pcftesterentity">
            <all-attributes />
        </entity>
    </fetch>`;

    const response = await Xrm.WebApi.retrieveMultipleRecords(
      "pcf_pcftesterentity",
      "?fetchXml=" + encodeURIComponent(fetch),
    );
    console.log(response.entities[0]); 
});



// /* eslint-disable camelcase */
// /* eslint-disable @typescript-eslint/camelcase */
// import { SetupGlobalContext } from "cdsify/lib/cdsnode";
// import { sdkify, setMetadataCache } from "cdsify";
// import { metadataCache } from "../../cds-generated/metadata";
// import { pcf_pcftesterentityMetadata } from "../../cds-generated/entities/pcf_PCFTesterEntity";
// test("retrieve", async () => {
//   await SetupGlobalContext();
//   const name = "Unit Test " + new Date().toLocaleTimeString();
//   const newRecord = {
//     pcf_name: name,
//   };

//   const id = await (await Xrm.WebApi.createRecord(pcf_pcftesterentityMetadata.logicalName, newRecord)).id;
//   try {
//     const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
//       <entity name="pcf_pcftesterentity">
//         <all-attributes />
//         <filter type="and">
//           <condition attribute="pcf_name" operator="eq" value="${name}" />
//         </filter>
//       </entity>
//     </fetch>`;
//     const response = await Xrm.WebApi.retrieveMultipleRecords(
//       "pcf_pcftesterentity",
//       "?fetchXml=" + encodeURIComponent(fetch),
//     );
//     setMetadataCache(metadataCache);
//     console.log(response.entities[0]);
//     console.log(await sdkify(response.entities[0], pcf_pcftesterentityMetadata.logicalName));
//     expect(response.entities.length).toBe(1);
//   } finally {
//     // Tidy Up
//     await Xrm.WebApi.deleteRecord(pcf_pcftesterentityMetadata.logicalName, id);
//   }
// });
