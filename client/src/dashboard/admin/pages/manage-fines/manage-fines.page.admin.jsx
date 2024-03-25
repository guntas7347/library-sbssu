import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageFinesPage = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Manage Fines</h1>
      <div className="grid grid-cols-1 gap-5 place-items-center">
        <LinkButton to="search-fines" label="Search Fines" />
      </div>{" "}
    </div>
  );
};

export default ManageFinesPage;
