import React from "react";
import { useParams } from "react-router";
import CustomizedTimeline from "./CustomizedTimeline.js"
export default function IssueComponent() {
    let { id } = useParams()
    return (
        <div>
            <CustomizedTimeline/>
            <h1>Issue</h1>
            <h1>{id}</h1>
        </div>
    );
}