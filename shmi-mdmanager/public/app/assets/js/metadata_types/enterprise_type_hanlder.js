/*
    enterprise_type:{
        "@id" : string,
        "name": string
    }
*/


/*
GET List Request
https: //serena:9000/serena/1.0/enterprise_types

GET List Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "enterprise_types": [{
            "@id": "serena:enterprise_type/0000000000000000/0/0",
            "name": "Undetermined"
        },
        {
            "@id": "serena:enterprise_type/0000000000000000/2/1",
            "name": "Sole Proprietor"
        },
        {
            "@id": "serena:enterprise_type/0000000000000000/2/2",
            "name": "Partnership"
        },
        {
            "@id": "serena:enterprise_type/0000000000000000/2/3",
            "name": "For-profit Corporation"
        },
        {
            "@id": "serena:enterprise_type/0000000000000000/2/4",
            "name": "Not-for-profit Corporation"
        },
        {
            "@id": "serena:enterprise_type/0000000000000000/2/5",
            "name": "Governmental Organization"
        }
    ]
}

*/