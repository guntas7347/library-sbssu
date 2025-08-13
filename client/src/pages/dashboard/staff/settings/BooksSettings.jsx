import SimpleHeader from "../../../../components/header/SimpleHeader";
import CategoryCard from "../../../../components/features/dashboard/staff/settings/books/CategoryCard";

const BooksSettings = () => {
  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Books Settings"
          sub="Configure issue durations, permissions, and compatibility"
        />
        <CategoryCard />
      </div>
    </>
  );
};

export default BooksSettings;
