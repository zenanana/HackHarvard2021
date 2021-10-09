import React, { useEffect, useState }from 'react';

import { useParams } from 'react-router';

export default function UserComponent() {

    let { id } = useParams();

    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await fetch("http://localhost:5000/get_user?user=bryan").then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setData(res)
        });
        //console.log(result.json());
        //console.log(result.body)
        //console.log(result.json());
        //console.log(result.data);
        //setData(result.data);
    }, [])
    return (
        <div>
            <h1>{data}</h1>
            <h1>User</h1>
            <h1>{id}</h1>
        </div>
    );
}