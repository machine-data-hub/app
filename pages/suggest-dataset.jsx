import Layout from "../components/Layout";
import postIssue from "../lib/postSet";
import { useState, useEffect, useRef } from "react";
import Link from "next";
import { AiFillGithub } from "react-icons/ai"

let useClickOutside = (handler) => {
  let ref = useRef();

  useEffect(() => {
    let clickHandler = (event) => {
      if (!ref.current.contains(event.target)) {
        handler();
      }
    };

    let keyHandler = (event) => {
      if (event.keyCode === 27) {
        handler();
      }
    };
    document.addEventListener("mousedown", clickHandler);

    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  });
  return ref;
};

const SuggesttDatasets = () => {
  // Title, Summary, and Dataset Link
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [link, setLink] = useState();
  const [modalStatus, setModalStatus] = useState(false);
  let clickRef = useClickOutside(() => {
    setModalStatus(false);
  });

  // Function to be executed when user presses enter or click the submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    var newSuggestion = {
      title: title,
      summary: summary,
      url: link,
    };
    postIssue(newSuggestion).then(setModalStatus(true));
    resetText();
  };

  const resetText = () => {
    document.getElementById("suggestion-form").reset();
  };

  return (
    <Layout title="About | Machine Data Hub">
      <div className="page__form">
        <div className="body">
          {/*MODAL*/}
          <div
            className={`modal ${modalStatus ? "active" : ""}`}
            onClick={() => setModalStatus(!modalStatus)}
          />
          {modalStatus && (
            <div className="message">

              <div className="message__text"  ref={clickRef}>
                <h2> Thank you for contributing!</h2>
              </div>
              
              <div className="visable__modal" />
            </div>
          )}

          <p>Suggest a dataset to be added to the Data Hub!</p>
          <form id="suggestion-form">
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
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SuggesttDatasets;
