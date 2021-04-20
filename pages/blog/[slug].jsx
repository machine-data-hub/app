import React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data;

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <ReactMarkdown source={content} />
    </Layout>
  );
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;
  const content = await import(`../../blogcontent/${slug}.md`);
  const data = matter(content.default);
  return { ...data };
};

export default PostTemplate;
