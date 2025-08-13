import { BookOpen, CheckCircle } from "lucide-react";

import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";
import { useState } from "react";
import Input from "../../../../../forms/input/Input-2";
import IssueConfirmation from "./Confirmation";
import useAlert from "../../../../../../hooks/useAlert";

const IssueSummary = ({
  data = { member: null, book: null, duration: 14 },
}) => {
  const setFeedback = useFeedback();
  const [btn, setBtn] = useState(true);
  const { showAlert, closeAlert, openAlert } = useAlert();

  const [issueDate, setIssueDate] = useState(new Date());
  const handleIssueBook = async () => {
    try {
      setBtn(false);
      const res = await server.issue.issue({
        cardNumber: data.member.cardNumber,
        accessionNumber: data.book.accessionNumber,
        issueDuration: data.duration,
        issueCondition: data.issueCondition,
        issueDate,
        issueRemark: data.remark,
      });
      setFeedback(1, res);
    } catch (error) {
      setFeedback(2, error);
      setBtn(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
        Issue Summary
      </h3>

      <div className="space-y-4">
        {/* Member Summary */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Member
          </h4>
          {data.member ? (
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p>
                {data.member.fullName} ({data.member.membershipId})
              </p>
              <p>Card: {data.member.cardNumber}</p>
            </div>
          ) : (
            <p className="text-sm text-blue-600 dark:text-blue-400">
              No card selected
            </p>
          )}
        </div>
        {/* Book Summary */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
            Book
          </h4>
          {data.book ? (
            <div className="text-sm text-purple-700 capitalize dark:text-purple-300">
              <p>{data.book.book.title}</p>
              <p>
                ID: {data.book.accessionNumber} • {data.book.category}
              </p>
              <p>
                Book Condition:{" "}
                <span className=" capitalize">{data.issueCondition}</span>
              </p>
            </div>
          ) : (
            <p className="text-sm text-purple-600 dark:text-purple-400">
              No book selected
            </p>
          )}
        </div>
        {/* Duration Summary */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
          <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
            Duration & Remark
          </h4>
          <div className="text-sm text-amber-700 dark:text-amber-300">
            <p>{data.duration} days</p>
            <p>
              Due Date:{" "}
              {new Date(
                Date.now() + parseInt(data.duration) * 24 * 60 * 60 * 1000
              ).toDateString()}
            </p>
            <p>Remark: {data.remark}</p>
          </div>
        </div>

        <div>
          <Input
            type="date"
            label="Issue Date"
            onChange={(e) => setIssueDate(e.target.value)}
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>

        <button
          onClick={openAlert}
          disabled={!data.member || !data.book || !btn}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white rounded-2xl hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <BookOpen className="w-6 h-6" />
          <span>Issue Book</span>
        </button>
      </div>
      <IssueConfirmation
        show={showAlert}
        data={{ ...data, issueDate }}
        onYes={handleIssueBook}
        onClose={closeAlert}
      />
    </div>
  );
};

export default IssueSummary;
