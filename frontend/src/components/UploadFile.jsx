import axios from "axios";
import { useState } from "react";

function UploadFile({ setQuiz }) {
  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/upload",
        formData
      );
      setQuiz(res.data.questions);
    } catch (err) {
      console.log(err);
      alert("Error uploading file");
    }
    setLoading(false);
  };

  return (
    <>
      <input type="file" onChange={upload} />
      {loading && <p>Generating quiz...</p>}
    </>
  );
}

export default UploadFile;
