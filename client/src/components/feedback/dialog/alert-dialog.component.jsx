const AlertDialog = ({
  title = "Confirm?",
  content = "This action can not be undone",
  open,
  handleClick,
  agreeMessage = "Agree",
  disagreeMessage = "Disagree",
}) => {
  const handleAgree = () => {
    handleClick(true);
  };
  const handleDisagree = () => {
    handleClick(false);
  };

  return (
    <div
      className={`${
        !open && "hidden"
      } fixed z-50 left-0 top-0 h-full w-full bg-black bg-opacity-50 flex justify-center`}
    >
      <div className="bg-white p-10 m-auto flex flex-col gap-10">
        <h1 className="text-center text-lg font-semibold">{title}</h1>
        <div> {content}</div>
        <div className="flex gap-5 justify-center items-center">
          <button className="my-button" onClick={handleDisagree}>
            {disagreeMessage}
          </button>
          <button className="my-button" onClick={handleAgree}>
            {agreeMessage}
          </button>
        </div>
      </div>
    </div>
  );
};

export const AlertDialogBB = ({ content }) => {
  return (
    <div className="fixed z-50 left-0 top-0 h-full w-full bg-black bg-opacity-50 flex justify-center">
      <div className="bg-white p-10 m-auto">
        <h1>Confirm</h1>
        <p>This action can not be undone</p>
        {content}
        <div>
          <button>Disagree</button>
          <button>Agree</button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
