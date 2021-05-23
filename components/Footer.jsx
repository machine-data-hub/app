import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillGithub } from "react-icons/ai";
import { FaFilePdf, FaFileUpload } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="main__footer">
      <div className="container">
        <a className="netlify" href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-dark.svg"
            alt="Deploys by Netlify"
          />
        </a>
      </div>
      <div className="container">
        <Link href="/suggest-dataset">
          <span className="icon">
            <FaFileUpload size={32}/>
          </span>
        </Link>
      </div>
      <div className="container">
        <Link href="https://github.com/machine-data-hub">
          <span className="icon">
            <AiFillGithub size={32}/>
          </span>
        </Link>
        </div>
    </div>
  );
};

export default Footer;
