import React, { useState, useEffect } from "react";

function ExtractFileContent({
  fileType = ".png",
  id = Date.now(),
  fileUpload,
  validation
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function validateName() {
    let isValid = true;
    const patt = new RegExp(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/);
    const doubleDotExtension = new RegExp(/^([^.]+)\.([^.]+)$/);
    if (!selectedFile) {
      setError("Please upload a file");
      isValid = false;
    } else if (
      patt.test(selectedFile.name) ||
      !doubleDotExtension.test(selectedFile.name)
    ) {
      setError("Invalid file name");
      isValid = false;
    }
    return isValid;
  }

  function validateFiletype() {
    let isValid = true;
    const typeArray = fileType.split(",");
    const selectedFileType = `.${selectedFile.name.split(".").pop()}`;
    if (typeArray.indexOf(selectedFileType) <= -1) {
      setError(
        `Invalid file type. Please select a valid file format (${fileType})`
      );
      isValid = false;
    }
    return isValid;
  }

  const handleSubmission = () => {
    fileUpload(selectedFile);
  };

  useEffect(() => {
    if (selectedFile) {
      const isValid = validateFiletype() && validateName();
      if (isValid) {
        setError(null);
        handleSubmission();
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    if (error) {
      validation(error);
    }
  }, [error]);

  return (
    <div className="pb-field-upload">
      <label style={{ cursor: "pointer" }} htmlFor={id}>
        Upload
      </label>
      <input
        hidden
        id={id}
        type="file"
        name="pbtextareafile"
        accept={fileType}
        onChange={changeHandler}
      />
    </div>
  );
}

export default ExtractFileContent;
