// import Link from "next/link";
// import React from 'react'
// import fs  from 'fs';
// import matter from "gray-matter";

// export default function BlogHome( props ) {
//     return (
//         <>
//         <h1>Blog Pages!: {props.blogTitle}</h1> 
//         <Link href={`/blogs/${props.blogTitle}`} />
//         </>
//     )
// }

// export async function getStaticProps() {
//     const allFiles = fs.readdirSync(`${process.cwd()}/blogcontent/posts`);

//     const posts = files.map((filename) => {
//         const markdownWithMetadata = fs.readFileSync(`content/posts/${filename}`).toString();

//         const {data} = matter(markdownWithMetadata);

//         const options = {year: "numeric", month:"long", day:"numeric"};
//         const formmattedDate = date.date.toLocaleDateString('en-Us', options);

//         const frontmatter = {
//             ...data,
//             date: formmattedDate,
//         };

//         return {
//             slug: filename.replace(".md", "",),
//             frontmatter,
//         };
//     });

//     return {
//         props: {posts,},
//     };
// }
