import React from "react";
import { useParams } from "react-router";

export default function IssueComponent() {
    let { id } = useParams()
    return (
        <div>
            <h1>Issue</h1>
            <h1>{id}</h1>
        </div>
    );
}