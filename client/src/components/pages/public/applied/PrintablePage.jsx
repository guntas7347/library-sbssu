import React from "react";
import { imagePathUrl } from "../../../../utils/functions";
import SpanningTable from "../../../table/spanning-table.component";
import { memberTypeLabels } from "../../../../utils/selectLabels";

const PrintablePage = ({ contentRef, data }) => {
  return (
    <>
      {" "}
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

          <div className="flex items-center justify-center mt-5 gap-24">
            <div>
              <SpanningTable
                rows={[
                  ["Application ID", data?.applicationId || ""],
                  ["User Type", memberTypeLabels[data?.memberType] || ""],
                  ["Roll Number", data?.rollNumber || ""],
                  ["Name", data?.fullName || ""],
                  ["Fathers Name", data?.fatherName || ""],
                  ["Gender", data?.gender.toUpperCase() || ""],
                  ["Date Of Birth", new Date(data?.dob || "").toDateString()],
                  [
                    `${
                      data?.role ||
                      "" === "STUDENT UG" ||
                      data?.role ||
                      "" === "STUDENT PG"
                        ? "Program"
                        : "Desigination"
                    }`,
                    data?.program || "",
                  ],
                  ["Specialization", data?.specialization.toUpperCase() || ""],
                  ["Batch", data?.batch || ""],
                  ["Email", data?.email || ""],
                  ["Phone Number", data?.phoneNumber || ""],
                  [
                    "Application Date",
                    new Date(data?.createdAt || "").toDateString(),
                  ],
                ]}
                // imageUrl={imagePathUrl(data?.imageUrl || "")}
              />
            </div>
            <div className="w-[33%]">
              <img
                className="border border-black w-full h-full max-h-full max-w-full object-cover size-52"
                crossOrigin="anonymous"
                src={imagePathUrl(data?.imageUrl || "")}
                alt="image"
              />
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
            <p>
              <span className="font-bold">1.</span> Books are issued for 14
              days.
            </p>

            <p>
              <span className="font-bold">2.</span> A fine of ₹1 per day is
              charged for late returns.
            </p>

            <p>
              <span className="font-bold">3.</span> Each student can have up to
              two library cards, with one book issued per card.
            </p>

            <p>
              <span className="font-bold">4.</span> Borrowers must replace any
              damaged or lost books.
            </p>

            <p>
              <span className="font-bold">5.</span> Books can be renewed once,
              provided there are no reservations.
            </p>

            <p>
              <span className="font-bold">6.</span> Library cards are for the
              exclusive use of the student to whom they are issued.
            </p>

            <p>
              <span className="font-bold">7.</span> Please maintain silence and
              respectful behavior in the library.
            </p>

            <p>
              <span className="font-bold">8.</span> Report lost library cards
              immediately; a fee may be charged for a replacement.
            </p>
          </div>
        </div>
        <div className="mt-auto">
          <hr className="border-black py-5" />
          <p className="font-bold">
            SHAHEED BHAGAT SINGH STATE UNIVERSITY CENTERAL LIBRARY
          </p>
        </div>
      </div>
    </>
  );
};

export default PrintablePage;
