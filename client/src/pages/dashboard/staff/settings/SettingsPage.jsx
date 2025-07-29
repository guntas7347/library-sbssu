import SettingsRoutes from "../../../../routes/staff/settings.router";
import PageHeader from "../../../../components/header/PageHeader";
import {
  Book,
  BookA,
  BookMarked,
  BookOpen,
  CreditCard,
  Lock,
  Microscope,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeaderButtons from "../../../../components/features/dashboard/staff/settings/HeaderButtons";

const SettingsPage = () => {
  const buttons = [
    { label: "Programs", to: "programs", svg: Microscope },
    { label: "Issue", to: "issue", svg: BookOpen },
    { label: "Return", to: "return", svg: BookMarked },
    { label: "Books", to: "books", svg: Book },
    { label: "Members", to: "members", svg: Users },
    { label: "Library Cards", to: "library-cards", svg: CreditCard },
    { label: "Security", to: "security", svg: Lock },
  ];

  return (
    <div className="space-y-2">
      <PageHeader title="Settings" svg={Settings} sub="Manage system settings">
        <HeaderButtons buttons={buttons} />
      </PageHeader>
      <div className="card min-h-screen p-6">
        <SettingsRoutes />
      </div>
    </div>
  );
};

export default SettingsPage;
