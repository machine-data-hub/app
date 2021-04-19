import Layout from "../components/Layout";
import { getSuggestions } from "../api/suggestAPI";

const Suggestions = () => {
  return (
    <Layout title="About | Machine Data Hub">
      <div className="page__about">
        <h1>Suggestions</h1>
        <div className="body">{getSuggestions()}</div>
      </div>
    </Layout>
  );
};
export default Suggestions;
