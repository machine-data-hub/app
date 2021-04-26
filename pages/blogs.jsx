import React from "react";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/blogData";
import BlogCard from "../components/BlogCard";

const BlogHome = ({ posts }) => {
  return (
    <Layout>
      <div className="blog__page">
        <h1>Blogs</h1>
        <div className="blog__tiles">
          {posts.map((item) => (
            <BlogCard key={item.slug} {...item} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default BlogHome;


export async function getStaticProps(context) {
  const { params } = context;
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts.map(({data, content, slug}) => ({
        ...data,
        date: data.date,
        img: data.img,
        author: data.author,
        content,
        slug,
      })),
    },
  };
}