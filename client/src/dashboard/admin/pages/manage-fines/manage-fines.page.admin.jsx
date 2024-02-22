import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageFinesPage = () => {
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Fines</h1>
      <LinkButton to="search-fines" label="Search Fines" />
    </div>
  );
};

export default ManageFinesPage;
