import SpanningTable from "../../components/table/spanning-table.component";

const AppliedStatusPage = ({ applicationDoc }) => {
  const {
    rollNumber,
    applicationNumber,
    name,
    fathersName,
    gender,
    dob,
    program,
    specialization,
    batch,
    email,
    phoneNumber,
    createdAt,
    status,
  } = applicationDoc;

  return (
    <div>
      <h1 className="">Application Status: {status}</h1>
      <h3>Application Details</h3>
      <div className="m-2">
        <SpanningTable
          rows={[
            ["Application Number", applicationNumber],
            ["Roll Number", rollNumber],
            ["Name", name],
            ["Fathers Name", fathersName],
            ["Gender", gender],
            ["Date Of Birth", new Date(dob).toDateString()],
            ["Program", program],
            ["Specialization", specialization],
            ["Batch", batch],
            ["Email", email],
            ["Phone Number", phoneNumber],
            ["Application Date", new Date(createdAt).toDateString()],
          ]}
        />
      </div>
    </div>
  );
};
export default AppliedStatusPage;
