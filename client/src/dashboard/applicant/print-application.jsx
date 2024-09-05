import React, { useEffect, useRef, useState } from "react";
import { fetchApplication } from "../http-requests";
import SpanningTable from "../../components/table/spanning-table.component";
import { useReactToPrint } from "react-to-print";

const PrintApplicationPage = () => {
  const componentRef = useRef();

  const [application, setApplication] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const { payload } = await fetchApplication();
        setApplication(payload);
      } catch (error) {
        console.error(error);
      }
    };

    if (application === false) {
      asyncFunc();
    }
  }, []);

  const {
    rollNumber,
    fullName,
    fathersName,
    gender,
    dob,
    program,
    specialization,
    batch,
    email,
    phoneNumber,
    createdAt,
    role,
  } = application;

  const handlePrint = useReactToPrint({
    documentTitle: `${rollNumber} Library Form`,
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center my-10 gap-5">
          <p className="text-lg font-bold">PRESS PRINT BUTTON</p>
          <button className="my-button p-10" onClick={handlePrint}>
            PRINT PAGE
          </button>
        </div>
        <div
          ref={componentRef}
          className="border  bg-white border-black h-[297mm] w-[210mm] flex flex-col text-center px-10 py-10"
        >
          <div>
            <div className="flex items-center justify-between">
              <img
                className="h-10 "
                src="https://sbssu.ac.in/images/Tricolor.png"
                alt="sbssu logo"
              />
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

            <div className="flex items-center justify-center mt-5">
              <SpanningTable
                rows={[
                  ["User Type", role],
                  ["Roll Number", rollNumber],
                  ["Name", fullName],
                  ["Fathers Name", fathersName],
                  ["Gender", gender],
                  ["Date Of Birth", new Date(dob).toDateString()],
                  [
                    `${role === "STUDENT" ? "Program" : "Desigination"}`,
                    program,
                  ],
                  ["Specialization", specialization],
                  ["Batch", batch],
                  ["Email", email],
                  ["Phone Number", phoneNumber],
                  ["Application Date", new Date(createdAt).toDateString()],
                ]}
              />
            </div>

            <div className="flex justify-between mt-32 font-bold">
              <div className="w-48">
                <hr className="w-full border-black" />
                <p className="text-center">{fullName}</p>
              </div>
              <div className="w-48">
                <hr className="w-full border-black" />
                {role === "STUDENT" ? <p>HOD {specialization}</p> : <p>HOD</p>}
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
                <span className="font-bold">3.</span> Each student can have up
                to two library cards, with one book issued per card.
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
                <span className="font-bold">7.</span> Please maintain silence
                and respectful behavior in the library.
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
      </div>
    </>
  );
};

export default PrintApplicationPage;
