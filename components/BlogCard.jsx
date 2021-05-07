import Link from "next/link";

const BlogCard = ({ slug, title, img, author, date, content }) => {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="blog__card">
                <img src={img} />
                <div className="blog__info">
                    <div className="blog__title">{title}</div>
                    <div className="blog__author">{author}</div>
                    <div className="blog__date">{date}</div>
                    {/* <div className="blog__summary">{content}</div> */}
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
