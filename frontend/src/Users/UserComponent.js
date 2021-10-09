import React from 'react';

import { useParams } from 'react-router';

export default function UserComponent() {

    let { id } = useParams();
    return (
        <div>
            <h1>User</h1>
            <h1>{id}</h1>
        </div>
    );
}