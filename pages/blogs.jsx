// import blogs from "../data/blogdata.json";
import Link from "next/link";
import React from 'react'

export default function BlogHome( props ) {
    return (
        <>
        <h1>Blog Pages!</h1> 
        // <Link href={`/blogs/${props.blogTitle}`} />
        </>
    )
}

// BlogHome.getInitialProps = () => {
//     return {
//         blogTitle: "Test inside Home.getInitialProps"
//     }
// }
