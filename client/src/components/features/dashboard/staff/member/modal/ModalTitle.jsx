import { CreditCard, TicketPlus, User } from "lucide-react";
import ModalTitle from "../../../../../modals/ModalTitle";

export const ViewMember = ({ membershipId }) => (
  <ModalTitle
    title="Member Details"
    sub={`ID: ${membershipId}`}
    svg={<User />}
    colorClass="bg-green-600"
  />
);

export const LibraryCardsTitle = () => (
  <ModalTitle
    title="Library Cards"
    sub="Member Card History"
    svg={<CreditCard />}
    colorClass="bg-purple-700"
  />
);

export const AllotCardTitle = () => (
  <ModalTitle
    title="Allot Library Card"
    sub="Issue new library cards to members"
    svg={<TicketPlus />}
    colorClass="bg-purple-700"
  />
);
