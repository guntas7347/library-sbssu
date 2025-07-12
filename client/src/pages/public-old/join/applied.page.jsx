import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { getCookieValue } from "../../../utils/functions";
// import { deleteApplication, fetchApplication } from "../../http-requests";
import SpanningTable from "../../../components/table/spanning-table.component";
import Input from "../../../components/forms/input";
import { UPLOADS_PATH } from "../../../keys";
import useQuery from "../../../components/hooks/use-query";
import { useFeedback } from "../../../components/context/snackbar.context";
import { useNavigate } from "react-router-dom";
import { PrinterSVG, WhatsappSVG } from "../../../components/svg/svg-icons";

const AppliedPage = () => {
  const setFeedback = useFeedback();
  const navigate = useNavigate();

  const gh = getCookieValue("gh");

  const { params } = useQuery();
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const [data, setData] = useState(null);
  const deletable = gh ? true : false;

  useEffect(() => {
    (async () => {
      try {
        if (Object.keys(params).length === 0) {
          if (!gh) throw Error("No application trace");
          const res = await fetchApplication(gh, "cookie");
          if (!res.data) throw new Error("No application");
          setData(res.p);
          setLoading(false);
        } else {
          if (!params.gh) throw new Error("No GH");
          const res = await fetchApplication(params.gh);
          if (!res.data) throw new Error("No application");
          setData(res.p);
          setLoading(false);
        }
      } catch (error) {
        navigate("/");
        setFeedback(2, "No application found");
      }
    })();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "235030",
    pageStyle: `
        @page {
          size: 210mm 297mm;
          margin:0 } 
      `,
  });

  const handleDelete = async () => {
    if (!deletable) return;

    if (
      confirm(
        "Are you sure you want to delete application? Click OK to proceed."
      )
    ) {
      try {
        const res = await deleteApplication(gh);
        setFeedback(1, res);
        navigate("/");
      } catch (error) {
        setFeedback(2, error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  const handleShare = () => {
    const path = `${window.location.protocol}//${window.location.hostname}${window.location.pathname}?gh=${data._id}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "I’ve submitted my library application. Please use this link to print the form if needed:\n"
      )}${path}`,
      "_blank"
    );
  };

  const imagePath = data.imageUrl
    ? UPLOADS_PATH + data.imageUrl
    : UPLOADS_PATH + "/sample-user.jpg";

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col px-5 justify-center items-center my-10 gap-5">
          <h2 className="text-4xl font-extrabold dark:text-white">
            You application has been submitted.
          </h2>
          <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
            Kindly print the form using PRINT FORM Button, get it verified from
            your HOD, and then submit it to the library.
          </p>
          <div className="flex gap-10">
            <button className="c-btn-blue flex gap-2" onClick={handlePrint}>
              PRINT FORM
              <PrinterSVG />
            </button>
            <button
              className="flex gap-2 justify-center items-center text-white bg-[#25D366] hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-800"
              onClick={handleShare}
            >
              Share
              <WhatsappSVG />
            </button>
          </div>
        </div>

        <div className="w-screen max-w-2xl px-4">
          {" "}
          <div className="bg-white w-full px-5 py-5 md:px-10 md:py-5 rounded dark:bg-gray-900">
            <div className="">
              <h2 className="text-center text-3xl mb-4  font-black">
                Application details
              </h2>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="grid gap-6">
                  <Input
                    disabled={true}
                    label="Name"
                    name="fullName"
                    value={data.fullName}
                  />
                  <Input
                    disabled={true}
                    label="Father's Name"
                    name="fatherName"
                    value={data.fatherName}
                  />

                  <Input
                    disabled={true}
                    label="Roll Number"
                    name="rollNumber"
                    value={data.rollNumber}
                  />
                </div>
                <div className="flex justify-center items-center order-first md:order-none">
                  <img
                    className="border border-black w-full h-full max-h-full max-w-full object-cover"
                    crossOrigin="anonymous"
                    src={imagePath}
                    alt="image"
                  />
                </div>
                <Input
                  disabled={true}
                  label="Gender"
                  name="gender"
                  value={data.gender}
                />
                <Input
                  disabled={true}
                  label="Date Of Birth"
                  name="dob"
                  type="date"
                  value={data.dob.slice(0, 10)}
                />
                <Input
                  disabled={true}
                  label="Category"
                  name="category"
                  value={data.category}
                />
                <Input
                  disabled={true}
                  label="User Type"
                  name="role"
                  value={data.role}
                />
                <Input
                  disabled={true}
                  label="Academic Program"
                  name="program"
                  value={data.program}
                />
                <Input
                  disabled={true}
                  label="Batch"
                  name="batch"
                  value={data.batch}
                />
                <Input
                  disabled={true}
                  label="Email address"
                  name="email"
                  type="email"
                  value={data.email}
                />
                <Input
                  disabled={true}
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  value={data.phoneNumber}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          {deletable && (
            <button
              type="button"
              onClick={handleDelete}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete Application
            </button>
          )}
        </div>
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

            <div className="flex items-center justify-center mt-5">
              <div>
                <SpanningTable
                  rows={[
                    ["Application ID", data.applicationId],
                    ["User Type", data.role],
                    ["Roll Number", data.rollNumber],
                    ["Name", data.fullName],
                    ["Fathers Name", data.fatherName],
                    ["Gender", data.gender],
                    ["Date Of Birth", new Date(data.dob).toDateString()],
                    [
                      `${
                        data.role === "STUDENT UG" || data.role === "STUDENT PG"
                          ? "Program"
                          : "Desigination"
                      }`,
                      data.program,
                    ],
                    ["Specialization", data.specialization],
                    ["Batch", data.batch],
                    ["Email", data.email],
                    ["Phone Number", data.phoneNumber],
                    [
                      "Application Date",
                      new Date(data.createdAt).toDateString(),
                    ],
                  ]}
                />
              </div>
              <div className="w-[33%]">
                <img
                  className="border border-black w-full h-full max-h-full max-w-full object-cover"
                  crossOrigin="anonymous"
                  src={imagePath}
                  alt="image"
                />
              </div>
            </div>

            <div className="flex justify-between mt-32 font-bold">
              <div className="w-48">
                <hr className="w-full border-black" />
                <p className="text-center">{data.fullName}</p>
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

export default AppliedPage;
