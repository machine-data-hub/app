import Link from "next/link";

const BlogCard = ({ slug, title, img, author, summary, date, content }) => {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="blog__card">
                <div className="blog__head">
                    <img src={img} height="250"/>
                </div>
                <div className="blog__info">
                    <div className="blog__title">{title}</div>
                    <div className="blog__author">{author}</div>
                    <div className="blog__date">{date}</div>
                    <div className="blog__summary">{summary}</div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
