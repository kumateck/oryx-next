import EditorViewer from "./viewer";

const TheAduseiEditorViewer = ({ content }: { content?: string }) => {
  return <div>{content && <EditorViewer content={content} />}</div>;
};

export default TheAduseiEditorViewer;
