import Layout from "../components/Layout";
import teams from "../data/team.json";

const About = () => {
  return (
    <Layout title="About | PHM Data Hub">
      <div className="page__about">
        <h1>About PHM Data Hub</h1>
        <div className="body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            vel metus finibus, consequat mi a, hendrerit lorem. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Proin dictum justo sed posuere auctor. In blandit vestibulum
            tortor, sit amet tristique elit rutrum sed. Morbi malesuada ante
            gravida leo scelerisque faucibus. Etiam pretium in massa quis
            maximus. Praesent finibus sollicitudin congue. Curabitur in leo
            lectus. Vestibulum scelerisque vestibulum imperdiet. Sed fringilla
            lectus ut ipsum elementum venenatis. Suspendisse non ante et magna
            auctor ullamcorper. Mauris mattis nunc nec enim porta ornare. In at
            ante mollis dui rhoncus varius.
          </p>
          <p>
            Praesent nec odio non eros faucibus varius. Morbi faucibus mi id
            nulla dignissim hendrerit. In eu viverra arcu. Nam ex sapien,
            tincidunt quis lacus vitae, hendrerit tristique lorem. Pellentesque
            varius nec libero et congue. Ut lacus lorem, feugiat id ultrices
            mollis, semper non odio. Praesent condimentum urna nulla, at dictum
            purus dictum sed. Cras efficitur nibh sit amet massa venenatis
            semper. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam vel sem lorem. Nam eget velit odio. Vestibulum sodales ut ex
            et laoreet. Sed ligula orci, auctor vel ante at, interdum porttitor
            turpis. Donec venenatis porttitor massa et posuere. Sed porttitor ex
            ac sem tincidunt, ut ultricies neque finibus.
          </p>
        </div>
        <h1>Meet Our Teams</h1>
        <div className="body">
          <ul className="team__list">
            {
              // map trough teams.json file and return the list
              teams?.map((item, index) => (
                <li key={index}>
                  <div className="team__image">
                    {/* if image exists, return img tag. if doesn't exist, return empty div */}
                    {item.profile_pict ? (
                      <img src={item.profile_pict} alt="Profile" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="team__details">
                    <div className="team__name">{item.name}</div>
                    <div className="team__summary">{item.summary}</div>
                    <a
                      href={`https://${item.linkedin_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.linkedin_url}
                    </a>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
