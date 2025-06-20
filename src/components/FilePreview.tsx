import { CODE_EXT, IMAGE_EXT, OFFICE_EXT, PDF_EXT, VIDEO_EXT } from "@/constants/exts";
import { FilePreviewProps } from "@/types/props/FilePreviewProps";
import { getLanguage } from "@/utilities/getLanguage";
import dynamic from "next/dynamic";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const FilePreview = ({ url, name }: FilePreviewProps) => {
  const extension = name.split('.').pop()?.toLowerCase();

  if (IMAGE_EXT.includes(extension || "")) {
    return <img src={url} alt={name} className="max-w-full h-[700px] m-auto outline-none" />;
  }

  if (VIDEO_EXT.includes(extension || "")) {
    return <video controls src={url} className="max-w-full h-[700px] m-auto outline-none" />;
  }

  if (extension === PDF_EXT) {
    return (
      <Document file={url}>
        <Page pageNumber={1} />
      </Document>
    );
  }

  if (OFFICE_EXT.includes(extension || "")) {
    return (
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
        width="100%"
        height="100%"
      />
    );
  }

  if (CODE_EXT.includes(extension || "")) {
    return (
      <div className="w-[90vh] h-[700px]">
        <MonacoEditor
          height="100%"
          language={getLanguage(extension || "")}
          theme="vs-dark" 
          options={{ readOnly: true }}
          path={name}
          value={""}
          onMount={async (editor) => {
            const response = await fetch(url);
            const code = await response.text();
            editor.setValue(code);
          }}
        />
      </div>
    );
  }

  return <div className="text-gray-500">미리보기를 지원하지 않는 파일입니다.</div>;
}

export default FilePreview