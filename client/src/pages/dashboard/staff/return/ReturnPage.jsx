import { BookMarked } from "lucide-react";
import PageHeader from "../../../../components/header/PageHeader";
import { useForm } from "../../../../hooks/useForm";
import SearchBook from "../../../../components/features/dashboard/staff/return/search/SearchBook";
import Summary from "../../../../components/features/dashboard/staff/return/Summary";
import RemarkCard from "../../../../components/cards/Remark";

const ReturnPage = () => {
  const { formFields, setFormFields, handleChange, setFields } = useForm(null);

  return (
    <>
      <div className="min-h-screen ">
        <PageHeader
          title="Return Book"
          sub="Return"
          svg={BookMarked}
          colorClass="bg-blue-700"
        />
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="space-y-5">
            <SearchBook
              onSearch={(e) => setFields(e)}
              onNull={() => setFormFields(null)}
            />
            {formFields && (
              <RemarkCard
                onChange={handleChange}
                placeholder="Add any notes about the book condition or return..."
              />
            )}
          </div>
          <div className="space-y-5">
            {formFields && <Summary data={formFields} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPage;
