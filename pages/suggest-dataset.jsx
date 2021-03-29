import { useState } from "react";
import Layout from "../components/Layout";
import axious from "axious";

const SuggesttDatasets = () => {
  // Title, Summary, and Dataset Link
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [link, setLink] = useState();

  // Function to be executed when user presses enter or click the submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSuggestions = {
      Name: this.title,
      Summary: this.summary,
      URL: this.link,
    };

    axious
      .post("https://machinedatahub.ai/suggest-dataset", newSuggestions)
      .then(() => console.log("Dataset Added", newSuggestions))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title="About | Machine Data Hub">
      <div className="page__form">
        <div className="body">
          <p>Suggest a dataset to be added to the Data Hub!</p>
          <form onClick={handleSubmit}>
            {/* auto update the state on keypress */}
            <input
              type="text"
              name="title"
              placeholder="Enter dataset title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              name="summary"
              placeholder="Enter dataset summary"
              onChange={(e) => setSummary(e.target.value)}
            />
            <input
              type="text"
              name="link"
              placeholder="Enter a link to a dataset"
              onChange={(e) => setLink(e.target.value)}
            />
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SuggesttDatasets;
