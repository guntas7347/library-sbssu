import { fromSnakeCase, imagePathUrl } from "../../../../utils/functions";
import SpanningTable from "../../../table/spanning-table.component";

const PrintablePage = ({ contentRef, data }) => {
  const libraryRules = [
    "Books are issued for 14 days.",
    "A fine of ₹1 per day is charged for late returns.",
    "Each student can have up to two library cards, with one book issued per card.",
    "Borrowers must replace any damaged or lost books.",
    "Books can be renewed once, provided there are no reservations.",
    "Library cards are for the exclusive use of the member to whom they are issued.",
  ];

  return (
    <>
      <div
        ref={contentRef}
        className="hidden print:flex border  bg-white border-black h-[297mm] w-[210mm]  flex-col text-center px-10 py-10"
      >
        <div>
          <div className="flex items-center justify-between">
            <img className="h-10 " src="/sbssu-logo.png" alt="sbssu logo" />
            <h1 className="text-2xl text-indigo-900 font-bold">
              SBSSU Centeral Library
            </h1>
          </div>
          <hr className="border-black my-3" />
          <h1 className="text-4xl font-bold mt-5">Library Form</h1>
          <div className="mt-5">
            <p className="text-right font-semibold">
              Print Date: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex-center gap-5">
            <div className="w-full">
              <SpanningTable
                rows={[
                  ["Application ID", data?.applicationId || ""],
                  ["Name", data?.fullName || ""],
                  ["Fathers Name", data?.fatherName || ""],
                  ["Email", data?.email || ""],
                  ["Phone Number", data?.phoneNumber || ""],
                  ["Date Of Birth", new Date(data?.dob).toDateString()],
                  ["Gender", fromSnakeCase(data?.gender) || ""],
                  ["Cast", fromSnakeCase(data?.cast) || ""],
                  [
                    "Address",
                    data?.streetAddress +
                      " " +
                      data?.city +
                      " " +
                      data?.state +
                      " " +
                      data?.pinCode,
                  ],
                  ["Roll Number", data?.rollNumber || ""],
                  ["Member Type", fromSnakeCase(data?.memberType) || ""],
                  ["Program", fromSnakeCase(data?.program) || ""],
                  ["Specialization", fromSnakeCase(data?.specialization) || ""],
                  ["Batch", data?.batch || ""],
                  [
                    "Application Date",
                    new Date(data?.createdAt).toDateString(),
                  ],
                ]}
              />
            </div>
            <div className="w-80 flex flex-col">
              <img
                className="border border-black w-full h-full object-cover"
                crossOrigin="anonymous"
                src={imagePathUrl(data?.photo)}
                alt="applicant-photo"
              />
              <h3 className="font-bold">{data?.fullName}</h3>
            </div>
          </div>

          <div className="flex justify-between mt-32 font-bold">
            <div className="w-48">
              <hr className="w-full border-black" />
              <p className="text-center">{data?.fullName || ""}</p>
            </div>
            <div className="w-48">
              <hr className="w-full border-black" />
              <p>HOD</p>
            </div>
          </div>
          <div className="text-start mt-20">
            <h1 className="font-bold text-lg">Library Rules:-</h1>
            {libraryRules.map((rule, index) => (
              <p key={index}>
                <span className="font-bold">{index + 1}.</span> {rule}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <hr className="border-black py-4" />
          <p className="font-bold">
            SHAHEED BHAGAT SINGH STATE UNIVERSITY CENTERAL LIBRARY
          </p>
        </div>
      </div>
    </>
  );
};

export default PrintablePage;
