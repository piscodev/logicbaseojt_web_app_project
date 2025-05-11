
import Snowflake from '@/lib/snowflake_tinapa/snowflake';
import React from 'react'

const Testering = () =>
{
    const snowflake = new Snowflake();
    const generatedId = snowflake.GenerateID();
    const decodedDate = new Date(snowflake.decodetoDate(generatedId));
    console.log("Generated ID:", generatedId);
    console.log("Generated Length:", generatedId.length);
    console.log("Decoded Date:", decodedDate);

    return (
        <>
            <div className="flex justify-center items-center min-h-[100px]">
                <h1>Testering</h1>
                <p>Generated ID: {generatedId}</p>
                <p>Generated Length: {generatedId.length}</p>
                <p>Decoded Date: {decodedDate.toString()}</p>
            </div>
        </>
    )
}

export default Testering
