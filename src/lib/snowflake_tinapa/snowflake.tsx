//A tiny module to generate time based 64-bit unique id, inspired by Twitter id (snowflake).

//Snowflake ID takes a 42 bit timestamp, 10 bit machine id (or any random number you provide), 12 bit sequence number.
// Since javascript is limited to 53 bit integer precision, Snowflake ID generates id in string format like "285124269753503744",
// which can be easily type casted into 64 bit bigint in database.

//https://github.com/dustinrouillard/snowflake-id
/* Usage:
* const snowflake = new Snowflake({ offset: 0 }); // new Date("2023-01-01T00:00:00Z").getTime(); // 1672531200000
* const generatedId = snowflake.GenerateID();
* const decodedDate = snowflake.decodetoDate(generatedId);
* console.log("Generated ID:", generatedId);
* console.log("Decoded Date:", decodedDate);
*
*/
import { hexToDec } from "./hex2dec";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc)
dayjs.extend(timezone)

interface SnowflakeOptions {
  mid?: number;
  offset?: number;
}

export default class Snowflake
{
  private seq: number;
  private mid: number;
  private offset: number;
  private lastTime: number;

  constructor(options?: SnowflakeOptions)
  {
    this.seq = 0;
    this.mid = (options?.mid || 1) % 1023;
    //this.offset = options?.offset || 0;
    // this.offset = options?.offset || new Date(process.env.NEXT_PUBLIC_ID_STAMP_OFFSET!).getTime();
    this.offset = options?.offset || dayjs(process.env.NEXT_PUBLIC_ID_STAMP_OFFSET!).tz(process.env.NEXT_PUBLIC_INIT_TZ).valueOf()
    this.lastTime = 0;
  }

  public GenerateID(): string
  {
    const time = dayjs().tz(process.env.NEXT_PUBLIC_INIT_TZ).valueOf()
    // const time = new Date().getTime();
    const bTime = (time - this.offset).toString(2);

    if (this.lastTime === time)
    {
      this.seq++;
      if (this.seq > 4095)
      {
        this.seq = 0;
        while (dayjs().tz(process.env.NEXT_PUBLIC_INIT_TZ).valueOf() <= time) {}
      }
    } else this.seq = 0;

    this.lastTime = time;
    let bSeq = this.seq.toString(2).padStart(12, "0");
    let bMid = this.mid.toString(2).padStart(10, "0");

    const bid = bTime + bMid + bSeq;
    let id = "";
    for (let i = bid.length; i > 0; i -= 4)
      id = parseInt(bid.substring(Math.max(0, i - 4), i), 2).toString(16) + id;

    return hexToDec(id) ?? "";
  }

  public decodetoDate(id: string): Date
  {
    // Convert ID back to binary
    const binaryId = BigInt(id).toString(2);

    // Extract bTime from binary
    const bTime = binaryId.substring(0, binaryId.length - 22);

    // Convert bTime to decimal and add the offset
    const timestamp = parseInt(bTime, 2) + this.offset;

    // Return the decoded date
    return dayjs(timestamp).tz(process.env.NEXT_PUBLIC_INIT_TZ).toDate()
  }
}