import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintablePage from "./PrintablePage";

const PrintButton = ({ data }) => {
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "235030",
    pageStyle: `
        @page {
          size: 210mm 297mm;
          margin:0 } 
      `,
  });
  return (
    <>
      <div className="mb-8 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
        >
          <Printer className="mr-3" />
          Print Application
        </button>
      </div>
      <PrintablePage contentRef={contentRef} data={data} />
    </>
  );
};

export default PrintButton;
