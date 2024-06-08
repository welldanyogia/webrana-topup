import React, { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {SyncLoader} from "react-spinners";

export default function LoadingAnimation() {
    let [color, setColor] = useState("#ffffff");
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    return (
        <div className="flex justify-center items-center border-white border-2 w-screen h-screen">
            <div className="sweet-loading mx-auto w-full border-white border-2">
                <SyncLoader color="#1655c6"/>
            </div>
        </div>
    );
}
