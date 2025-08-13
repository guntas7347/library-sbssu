import { Book, BookMarked, Calendar, Clock, Scan, User } from "lucide-react";
import OverdueAlert from "./OverdueAlert";
import BookDetails from "./BookDetails";
import MemberDetails from "./MemberDetails";
import IssueDetails from "./IssueDetails";
import Input from "../../../../../forms/input/Input-2";
import useFeedback from "../../../../../../hooks/useFeedback";
import { useForm } from "../../../../../../hooks/useForm";
import { useEffect, useState } from "react";
import server from "../../../../../../services/server.api";

const SearchBook = ({ onSearch = () => {}, onNull = () => {} }) => {
  const setFeedback = useFeedback();
  const { formFields, handleChange } = useForm();
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    try {
      if (!formFields.search) return;
      const res = await server.return.fetch(formFields.search);
      onSearch(res.data);
      setData(res.data);
    } catch (error) {
      setData(null);
      onNull();
      setFeedback(2, error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => clearTimeout(debounce);
  }, [formFields]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Book className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        Book Information
      </h3>
      <div className="space-y-4">
        <Input
          label="Book ID"
          name="search"
          onChange={handleChange}
          placeholder="Enter Accession Number"
          SVG={<Scan />}
        />

        {/* Book & Member Details */}
        {data && (
          <div className="space-y-4">
            <OverdueAlert issue={data.issue} />
            <BookDetails book={data.book} />
            <MemberDetails member={data.member} />
            <IssueDetails issue={data.issue} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
