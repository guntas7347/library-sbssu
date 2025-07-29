import MemberSearch from "../../../../components/features/dashboard/staff/issueBook/inputSection/MemberSearch";
import BookSearch from "../../../../components/features/dashboard/staff/issueBook/inputSection/BookSearch";
import IssueDuration from "../../../../components/features/dashboard/staff/issueBook/inputSection/IssueDuration";
import IssueSummary from "../../../../components/features/dashboard/staff/issueBook/summarySection/IssueSummary";
import { useForm } from "../../../../hooks/useForm";
import PageHeader from "../../../../components/header/PageHeader";
import { BookOpen } from "lucide-react";
import IssueCondition from "../../../../components/features/dashboard/staff/issueBook/inputSection/IssueCondition";
import RemarkCard from "../../../../components/cards/Remark";

const IssuePage = () => {
  const { formFields, setFields, handleChange } = useForm();

  return (
    <>
      <div className="min-h-screen ">
        <PageHeader
          title="Issue Book"
          sub="Issue books to members"
          svg={BookOpen}
          colorClass="bg-green-700"
        />
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="space-y-5">
            <MemberSearch onSelect={(member) => setFields({ member })} />
            <IssueCondition
              onSelect={(issueCondition) => setFields({ issueCondition })}
            />
            <RemarkCard
              onChange={handleChange}
              placeholder="Add any notes about the book condition or issue..."
            />
          </div>
          <div className="space-y-5">
            <BookSearch onSelect={(book) => setFields({ book })} />
            <IssueDuration onSelect={(duration) => setFields({ duration })} />

            <IssueSummary data={formFields} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuePage;
