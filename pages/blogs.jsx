import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import blogdata from "../data/blogdata.json";

export default function BlogHome(props) {
  return (
    <Layout>
      <h1>Blogs</h1>
      <div className="blog__tiles">
        {blogdata.map((blog, key) => (
          <Link href={blog.URL}>
            <div className="blog__card" key={key}>
              <img src={blog.IMG} />
              <div className="blog__info">
                <div className="blog__title">{blog.Title}</div>
                <div className="blog__author">{blog.Author}</div>
                <div className="blog__date">{blog.Date}</div>
                <div className="blog__summary">{blog.Summary}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
