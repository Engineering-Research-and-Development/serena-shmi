/*
    site_type:{
        "@id" : string,
        "name": string
    }
*/


/*
GET List Request
https: //serena:9000/serena/1.0/site_types


GET List Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "site_types": [{
            "@id": "serena:site_type/0000000000000000/0/0",
            "name": "Undetermined"
        },
        {
            "@id": "serena:site_type/0000000000000000/2/1",
            "name": "Facility"
        },
        {
            "@id": "serena:site_type/0000000000000000/2/2",
            "name": "Office Building"
        },
        {
            "@id": "serena:site_type/0000000000000000/2/3",
            "name": "Industrial Plant"
        },
        {
            "@id": "serena:site_type/0000000000000000/2/4",
            "name": "Mobile Object"
        },
        {
            "@id": "serena:site_type/0000000000000000/2/5",
            "name": "Vehicle"
        }
    ]
}

*/