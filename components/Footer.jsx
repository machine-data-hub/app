import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="main__footer">
      <div className="footer__left">
        <a className="netlify" href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-dark.svg"
            alt="Deploys by Netlify"
          />
        </a>
      </div>
      <div className="footer__right">
        <Link href="https://github.com/machine-data-hub">
          <span className="icon">
            <AiFillGithub size={28}/>
          </span>
        </Link>
        <Link href="/suggest-dataset">
          <span className="footer__text">
            Suggest A Dataset
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
