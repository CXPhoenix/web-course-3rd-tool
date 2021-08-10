import React, { useState } from "react";
import Editor from "./Components/Editor/Editor";
import Header from "./Components/Header/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { editorList } from "./Components/Data/EditorData";
import { htmlCodesData } from "./Components/Data/HtmlData";
import { defaultCssData } from "./Components/Data/CssData";
import Preview from "./Components/Preview/Preview";
import AddCodeModal from "./Components/Modal/AddCodeModal";

library.add(fas);

function addCode(Codes, code) {
  Codes.push(code);
  return Codes;
}

function deleteCode(Codes, codeIndex) {
  Codes.splice(codeIndex, 1);
  return Codes;
}

function App() {
  const [htmlCodes, setHtmlCodes] = useState([...htmlCodesData]);
  const [cssCodes, setCssCodes] = useState([...defaultCssData]);
  const [openModal, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("html");
  const [useBs, setUseBsState] = useState(false);

  let webCodes = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>你的網站</title>
      ${
        useBs
          ? `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">`
          : `<style>
      ${cssCodes.map((item) => item + "\n").join("")}
      </style>`
      }
  </head>
  <body>\n
  ${htmlCodes.map((item) => item + "\n").join("")}
  ${
    useBs
      ? `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>`
      : ``
  }
  </body>\n</html>`;

  let downloadWebCodes = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>你的網站</title>
      ${
        useBs
          ? `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">`
          : `<link rel="stylesheet" href="style.css">`
      }
  </head>
  <body>\n
  ${htmlCodes.map((item) => item + "\n").join("")}
  ${
    useBs
      ? `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>`
      : ``
  }
  </body>\n</html>`;

  let cssWebCodes = `${cssCodes.map((item) => item + "\n").join("")}`;

  function closeModalEventHandler() {
    setModalOpen(false);
  }

  function openAddHtmlCodeAreaEventHandler() {
    setModalType("html");
    setModalOpen(true);
  }

  function openAddCssCodeAreaEventHandler() {
    setModalType("css");
    setModalOpen(true);
  }

  function downloadFile(webCodes, type) {
    const fileBlob = new Blob(Array.from(webCodes));
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    if (type === "html") {
      a.setAttribute("download", "index.html");
    } else if (type === "css") {
      a.setAttribute("download", "style.css");
    }
    a.click();
  }

  function addCodeEventHandler(modalType) {
    const singleHTMLElement = ["img", "input", "br", "hr"];
    let codes = "";
    if (modalType === "html") {
      const elementName = document.querySelector("#htmlElementName");
      const elementId = document.querySelector(`#htmlElementId`);
      const elementClass = document.querySelector(`#htmlElementClass`);
      const elementStyle = document.querySelector(`#htmlElementStyle`);
      const elementContent = document.querySelector(`#htmlElementContent`);
      const elementExtraSetting = document.querySelector(
        `#htmlElementExtraSetting`
      );
      if (singleHTMLElement.indexOf(elementName.value) === -1) {
        codes = `<${elementName.value} 
        ${elementId.value ? `id="${elementId.value}"` : ``} 
        ${elementClass.value ? `class="${elementClass.value}"` : ``} 
        ${elementStyle.value ? `style="${elementStyle.value}"` : ``} 
        ${elementExtraSetting.value}>
        ${elementContent.value}
        </${elementName.value}>`;
      } else {
        codes = `<${elementName.value} 
        ${elementId.value ? `id="${elementId.value}"` : ``} 
        ${elementClass.value ? `class="${elementClass.value}"` : ``} 
        ${elementStyle.value ? `style="${elementStyle.value}"` : ``} 
        ${elementExtraSetting.value} />`;
      }
      elementName.value = "";
      elementId.value = "";
      elementClass.value = "";
      elementStyle.value = "";
      elementContent.value = "";
      elementExtraSetting.value = "";
      setHtmlCodes(addCode([...htmlCodes], codes));
      setModalOpen(false);
      return;
    }

    if (modalType === "css") {
      const elementName = document.querySelector("#cssName");
      const elementContent = document.querySelector("#cssContent");
      codes = `${elementName.value} {
        ${elementContent.value}
      }`;
      elementName.value = "";
      elementContent.value = "";
      setCssCodes(addCode([...cssCodes], codes));
      setModalOpen(false);
      return;
    }
  }

  function deleteHtmlCodeEventHandler(codeSource) {
    setHtmlCodes(deleteCode([...htmlCodes], codeSource.index));
  }

  function deleteCssCodeEventHandler(codeSource) {
    setCssCodes(deleteCode([...cssCodes], codeSource.index));
  }

  function changeHtmlCodeEventHandler(codeSource, codeDestination) {
    let tmpCodes = [...htmlCodes];
    const tmp = tmpCodes[codeSource.index];
    tmpCodes.splice(codeSource.index, 1);
    tmpCodes.splice(codeDestination.index, 0, tmp);
    setHtmlCodes(tmpCodes);
  }

  function changeCssCodeEventHandler(codeSource, codeDestination) {
    let tmpCodes = [...cssCodes];
    const tmp = tmpCodes[codeSource.index];
    tmpCodes.splice(codeSource.index, 1);
    tmpCodes.splice(codeDestination.index, 0, tmp);
    setCssCodes(tmpCodes);
  }

  function switchEventHandler(e) {
    return setUseBsState(e.target.checked)
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <AddCodeModal
        isModalOpen={openModal}
        modalType={modalType}
        modalTitle={`增加 HTML 程式碼`}
        addCodeEventHandler={() => addCodeEventHandler(modalType)}
        closeModalEventHandler={closeModalEventHandler}
      />

      <Header courseTitle={`使用 CSS Framework`} />
      <div className="flex flex-col sm:flex-row h-full">
        <Editor
          editorList={editorList}
          htmlData={htmlCodes}
          openAddHtmlCodeAreaEventHandler={openAddHtmlCodeAreaEventHandler}
          downloadHtmlFileEventHandler={() =>
            downloadFile(downloadWebCodes, "html")
          }
          deleteHtmlCodeEventHandler={deleteHtmlCodeEventHandler}
          changeHtmlCodeEventHandler={changeHtmlCodeEventHandler}
          cssData={cssCodes}
          openAddCssCodeAreaEventHandler={openAddCssCodeAreaEventHandler}
          downloadCssFileEventHandler={() => downloadFile(cssWebCodes, "css")}
          deleteCssCodeEventHandler={deleteCssCodeEventHandler}
          changeCssCodeEventHandler={changeCssCodeEventHandler}
          switchEventHandler={switchEventHandler}
        />
        <Preview webCodes={webCodes} />
      </div>
    </div>
  );
}

export default App;
