import Layout from "../../components/Layout";
import { getAllPosts } from '../../lib/blogData';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

const BlogPost = (props) => {

    const hydrated = hydrate(props.content);

    return (
        <Layout>
          <div className="blog__container">
            <div className="blog__title">{props.title}</div>
            <div className="blog__author">{props.author}</div>
            <div className="blog__date">{props.date}</div>

            <div className="prose">{hydrated}</div>
          </div>
        </Layout>
    );
}

export default BlogPost;



export async function getStaticProps(context) {
  const { params } = context;
  const allPosts = getAllPosts();
  const content = allPosts.find((item) => item.slug === params.slug);

  const mdxSource = await renderToString(content.content);

  // BELOW: TALKING ABOUT CONTENT: MDXSOURCE
  // may need to change to mdxSource.content, 

  return {
    props: {
      ...content.data,
      content: mdxSource,
    }
  };
}

export async function getStaticPaths() {
  const allPosts = getAllPosts();
  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}