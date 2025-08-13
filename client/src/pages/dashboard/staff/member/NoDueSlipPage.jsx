import { CheckCircle } from "lucide-react";
import { fromSnakeCase } from "../../../../utils/functions";

const NoDueSlipPage = ({ data, ref }) => {
  if (!data) return null;
  const printDate = new Date().toLocaleDateString();

  return (
    <div
      ref={ref}
      className="hidden relative print:flex bg-white border-2 border-black h-[297mm] w-[210mm] flex-col text-black p-10 font-serif"
    >
      {/* Header Section */}
      <header className="flex items-center justify-between pb-6 border-b-2 border-black">
        <div className="text-left">
          <p className="font-semibold">
            Ref No: SBSSU/LIB/NDC/{new Date().getFullYear()}/
            {data?.membershipId?.slice(4, 6) ?? " "}/
            {data?.membershipId?.slice(7, 11) ?? " "}
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Date: {printDate}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-2 text-lg text-left">
        <div className="flex-center py-2">
          <img
            src="https://sbssu.ac.in/8d9475c8-d451-4424-93f9-ac6f0df32284.jpeg"
            alt="Library Logo"
            className="w-20 h-20"
          />
        </div>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">No-Due Certificate</h1>
          <p className="text-lg font-semibold">Central Library</p>
          <p className="text-sm">
            Shaheed Bhagat Singh State University, Ferozepur
          </p>
        </div>
        <p className="leading-relaxed">
          This is to certify that{" "}
          <strong className="px-2 border-b">
            {data?.fullName ?? "________________________________"}
          </strong>
          , son/daughter of{" "}
          <strong className="px-2 border-b">
            {data?.fatherName ?? "________________________________"}
          </strong>
          , a student of{" "}
          <strong className="px-2 border-b">
            {fromSnakeCase(data?.program) ?? "________________________________"}
          </strong>
          {" ("}
          <strong className="px-1 border-b">
            {fromSnakeCase(data?.specialization) ??
              "________________________________"}
          </strong>
          {"),"}
          with Membership ID{" "}
          <strong className="px-2 border-b font-mono">
            {data?.membershipId ?? "________________________________"}
          </strong>
          {data?.rollNumber && ` and Roll Number ${data.rollNumber}`}, has
          returned all the library materials borrowed from the Central Library.
        </p>
        <p className="mt-6">
          As per our records, there are no outstanding dues against their name.
        </p>
        <div className="mt-12 p-4 border-2 border-dashed border-black">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Member Name:</span>
              <span>{data?.fullName ?? " "}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Father's Name:</span>
              <span>{data?.fatherName ?? " "}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Membership ID:</span>
              <span className="font-mono">{data?.membershipId ?? " "}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Roll Number:</span>
              <span>{data?.rollNumber ?? "Not Provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Program:</span>
              <span>{fromSnakeCase(data?.program) ?? " "}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Specialization:</span>
              <span>{fromSnakeCase(data?.specialization) ?? " "}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Cleared On:</span>
              <span>
                {data?.updatedAt
                  ? new Date(data.updatedAt).toLocaleDateString()
                  : " "}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="pt-8 mt-auto flex justify-between items-end text-center">
        <div className="border-t-2 border-black pt-2">
          <p className="font-semibold">Member's Signature</p>
        </div>
        <div className="border-t-2 border-black pt-2">
          <p className="font-semibold">Librarian's Signature & Seal</p>
        </div>
      </footer>
      <img
        src="https://sbssu.ac.in/8d9475c8-d451-4424-93f9-ac6f0df32284.jpeg"
        alt="Library Logo"
        className="absolute w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 select-none pointer-events-none transform"
      />
    </div>
  );
};

export default NoDueSlipPage;
