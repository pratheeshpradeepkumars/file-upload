import "./styles.css";
import ExtractFileContent from "./ExtractFileContent";
import { useState } from "react";

export default function App() {
  const [fileName, setFileName] = useState(null);
  function handleFileUpload(file) {
    setFileName(file.name);
  }

  function validation(error) {
    console.log("Error : ", error);
  }

  return (
    <div className="App">
      <h1>File upload</h1>
      <ExtractFileContent
        fileUpload={handleFileUpload}
        validation={validation}
      />
      {fileName && <div className="file-name">{fileName}</div>}
    </div>
  );
}
