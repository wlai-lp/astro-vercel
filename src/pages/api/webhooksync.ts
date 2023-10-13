import type { APIRoute } from "astro";
import { getSheetMappingByWebhookId } from "../../db/ss_sheet_mappings";
import { selectColumnByWebhookId } from "../../db/ss_column_mappings";
import { getRowBySsIdAndRowId } from "../api/smartsheet/getRowBySheetIdRowId";
import { updateDestSheet } from "../api/smartsheet/updateSheet"

// #REF: astro read regular request payload using async request.json()
export const POST: APIRoute = async ({ request }) => {
  console.log(request.method);
  //   console.log(await request.json());
  // const payload = await request.json();
  //  #REF : Astro - you can map the variable directly to the return json element with the same name
  const { webhookId, events } = await request.json();

  const arrayOfEvents: Event[] = events.map((item: any) => {
    return {
      objectType: item.objectType,
      eventType: item.eventType,
      id: item.id,
      userId: item.userId,
      timestamp: item.timestamp,
      rowId: item.rowId,
      columnId: item.columnId,
    };
  });

  // replicate logic
  // check webhook payload to see if we have a matching trigger column id
  // 1. get webhook from payload
  // 2. query ss_sheet_mappings for webhook_id, get source_trigger_column_id
  const sheetMapping = await getSheetMappingByWebhookId(webhookId);
  if (!sheetMapping) {
    return Response.json('');
  }
  const triggerId = sheetMapping.at(0)?.source_trigger_column_id;
  // }

  // 3. check webhook payload to see if any of it is trigger
  console.log("key event is " + triggerId);
  const keyEvents: Event[] = events.filter((event: any) => {
    // todo: i think we need filter by cell and eventtype = created or updated
    if (event.columnId == triggerId && event.objectType == "cell") {
      return event;
    }
  });

  // event hat has.  i don't think we need to do this, the cell created has row value
  const rowEvents = events.filter((event: any) => {
    if (
      event.objectType == "row" &&
      (event.eventType == "created" || event.eventType == "updated")
    ) {
      return event;
    }
  });

  // 4a. if no trigger then disregard
  if (keyEvents.length < 1) {
    return new Response(JSON.stringify({ message: "no key data" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    keyEvents.map(async (event: Event) => {
      // 4b. if there's trigger then perfrom the update logic
      // get the value from source
      const sourceSheetId = sheetMapping.at(0)?.source_id;
      const destSheetId = sheetMapping.at(0)?.dest_id;
      // get colume mapping by webhookid
      const colMappings = await selectColumnByWebhookId(webhookId);
      console.log("🖼️ colMappings = " + JSON.stringify(colMappings));
      // get the row that was updated from webhook

      // get the ss sheetid / updated row from webhook / get mapping columns from db and retrieve values
      const rowid = event.rowId || 0;
      const { cells } = await getRowBySsIdAndRowId(
        sourceSheetId,
        rowid.toString()
      );
      const rowCells: Cell[] = JSON.parse(JSON.stringify(cells));
      console.log(JSON.stringify(rowCells));
      // for the row, get each column, see if it's 1 of the mapping columns,
      let updateCells: Cell[] = [];
      rowCells.map((cell: Cell) => {
        const colMaps = colMappings?.filter(
          (colMapping) =>
            colMapping.source_column_id == cell.columnId.toString()
        );
        if (colMaps !== undefined) {
          if (colMaps?.length > 0) {
            // should only have 1 element
            const colMap = colMaps[0];
            console.log("😂 " + JSON.stringify(cell));
            // it is possible that the source row column does not have value
            console.log(
              "🖥️ source row value on keycolum is " +
                cell.value +
                " : " +
                colMap.deskt_column_id +
                ": set dest col value" +
                colMap.deskt_column_id
            );

            // if row has value, then we update destination with the name value
            if (cell.value !== undefined) {
              console.log("source row mapping col has value, update it to des");
              updateCells.push({
                columnId: colMap.deskt_column_id!,
                value: cell.value,
                displayValue: cell.displayValue,
              });
            }
          }
        }
      });
      // set the value to destination
      console.log("🚀 payload to dest " + JSON.stringify(updateCells));
      const payload = {"cells" : updateCells}
      const updateResult = await updateDestSheet(destSheetId, JSON.stringify(payload))


      console.log("🚀" + sourceSheetId + " " + destSheetId);
    });
  }

  // TBD: comment logic
  //   console.log(payload)
  console.log("🚀🚀🚀");
  console.log(keyEvents);

  console.log(webhookId);
  // console.log(triggerId?.at(0).source_trigger_column_id)
  console.log(triggerId);
  // console.log(JSON.stringify(triggerId?[0]))
  // console.log(events.length)
  events.map((event: Event) => {
    console.log(event.timestamp);
  });

  // return new Response(JSON.stringify({ payload }), {
  return new Response(JSON.stringify({ message: "can i send a meesage " }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Generated by https://quicktype.io

export interface Webhook {
  payload: Payload;
}

export interface Payload {
  nonce: string;
  timestamp: string;
  webhookId: number;
  scope: string;
  scopeObjectId: number;
  events: Event[];
}

export interface Event {
  objectType: string;
  eventType: string;
  id?: number;
  userId: number;
  timestamp: string;
  rowId?: number;
  columnId?: number;
}

// Generated by https://quicktype.io

export interface SheetRow {
  id: number;
  sheetId: number;
  rowNumber: number;
  siblingId: number;
  version: number;
  expanded: boolean;
  accessLevel: string;
  createdAt: string;
  modifiedAt: string;
  cells: Cell[];
}

export interface Cell {
  columnId: string;
  value?: string;
  displayValue?: string;
}
