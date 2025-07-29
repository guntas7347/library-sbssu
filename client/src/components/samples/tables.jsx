import React, { useState, useEffect } from "react";
import {
  User,
  Book,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Mail,
  Phone,
  MapPin,
  FileText,
  Users,
  Briefcase,
  AlertCircle,
  DollarSign,
  CreditCard,
  GraduationCap,
  Building,
  Award,
  BookOpen,
  UserPlus,
  CalendarDays,
  TrendingUp,
  Shield,
} from "lucide-react";
import { fromSnakeCase, imagePathUrl } from "../../utils/functions";
import Table from "../table/Table";
import GenderIcon from "../blocks/genderIcon/GenderIcon";
import Actions from "../table/Actions";

const TableExamples = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [modal, setModal] = useState({ type: null, id: null });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Members Table
  const membersData = {
    data: [
      {
        id: 1,
        fullName: "Sarah Johnson",
        email: "sarah.johnson@university.edu",
        membershipId: "LIB2024001",
        gender: "female",
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
        program: "computer_science",
        specialization: "artificial_intelligence",
        memberType: "graduate_student",
        status: "active",
        joinDate: "2024-01-15",
        booksIssued: 3,
        fineAmount: 0,
      },
      {
        id: 2,
        fullName: "Michael Chen",
        email: "m.chen@university.edu",
        membershipId: "LIB2024002",
        gender: "male",
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
        program: "business_administration",
        specialization: "finance",
        memberType: "undergraduate_student",
        status: "active",
        joinDate: "2024-02-20",
        booksIssued: 1,
        fineAmount: 5.5,
      },
    ],
    totalPages: 15,
    page: currentPage,
    setPage: setCurrentPage,
  };

  const membersArchitecture = [
    {
      header: "Member Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.fullName}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
              {item.fullName}
              <GenderIcon gender={item.gender} />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.email}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {item.membershipId}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Department",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <GraduationCap className="w-4 h-4 mr-1 text-blue-500" />
            {fromSnakeCase(item.program)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.specialization)}
          </div>
        </div>
      ),
    },
    {
      header: "Level",
      render: (item) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
          {fromSnakeCase(item.memberType)}
        </span>
      ),
    },
    {
      header: "Books & Fines",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Book className="w-4 h-4 mr-1 text-green-500" />
            {item.booksIssued} books
          </div>
          <div
            className={`text-xs ${
              item.fineAmount > 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {item.fineAmount} fine
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
              : item.status === "inactive"
              ? "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => setModal({ type: "view", id: item.id })}
          onEdit={() => setModal({ type: "edit", id: item.id })}
          onDelete={() => setModal({ type: "delete", id: item.id })}
        >
          <button
            className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-all duration-200"
            onClick={() => setModal({ type: "cards-view", id: item.id })}
            type="button"
          >
            <CreditCard className="w-4 h-4" />
          </button>
        </Actions>
      ),
    },
  ];

  // Books Table
  const booksData = {
    data: [
      {
        id: 1,
        title: "The Psychology of Design",
        author: "Don Norman",
        isbn: "978-0465050659",
        category: "design",
        subcategory: "user_experience",
        publisher: "Basic Books",
        publishYear: 2013,
        edition: "Revised Edition",
        pages: 368,
        language: "english",
        availability: "available",
        totalCopies: 5,
        availableCopies: 3,
        rating: 4.8,
        location: "A-2-15",
      },
      {
        id: 2,
        title: "Clean Code: A Handbook",
        author: "Robert C. Martin",
        isbn: "978-0132350884",
        category: "programming",
        subcategory: "software_engineering",
        publisher: "Prentice Hall",
        publishYear: 2008,
        edition: "1st Edition",
        pages: 464,
        language: "english",
        availability: "issued",
        totalCopies: 3,
        availableCopies: 0,
        rating: 4.9,
        location: "B-1-08",
      },
    ],
    totalPages: 25,
    page: currentPage,
    setPage: setCurrentPage,
  };

  const booksArchitecture = [
    {
      header: "Book Details",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {item.title}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            by {item.author}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center space-x-2">
            <span>ISBN: {item.isbn}</span>
            <span>•</span>
            <span>{item.publishYear}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      render: (item) => (
        <div className="space-y-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.category === "design"
                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200"
            }`}
          >
            {fromSnakeCase(item.category)}
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.subcategory)}
          </div>
        </div>
      ),
    },
    {
      header: "Publication",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Building className="w-4 h-4 mr-1 text-gray-500" />
            {item.publisher}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {item.edition} • {item.pages} pages
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Location: {item.location}
          </div>
        </div>
      ),
    },
    {
      header: "Availability",
      render: (item) => (
        <div className="space-y-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.availability === "available"
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                : "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200"
            }`}
          >
            {item.availability === "available" ? (
              <CheckCircle className="w-3 h-3 mr-1" />
            ) : (
              <Clock className="w-3 h-3 mr-1" />
            )}
            {fromSnakeCase(item.availability)}
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {item.availableCopies}/{item.totalCopies} copies
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-900 dark:text-white">
              {item.rating}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => setModal({ type: "view", id: item.id })}
          onEdit={() => setModal({ type: "edit", id: item.id })}
          onDelete={() => setModal({ type: "delete", id: item.id })}
        >
          <button
            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-all duration-200"
            onClick={() => setModal({ type: "issue", id: item.id })}
            type="button"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </Actions>
      ),
    },
  ];

  // Applicants Table
  const applicantsData = {
    data: [
      {
        id: 1,
        fullName: "Emma Thompson",
        email: "emma.thompson@email.com",
        phone: "+1 (555) 123-4567",
        position: "senior_librarian",
        department: "administration",
        applicationDate: "2024-03-10",
        experience: "8 years",
        education: "masters_library_science",
        status: "under_review",
        expectedSalary: 65000,
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
        gender: "female",
      },
      {
        id: 2,
        fullName: "James Rodriguez",
        email: "james.rodriguez@email.com",
        phone: "+1 (555) 987-6543",
        position: "library_assistant",
        department: "circulation",
        applicationDate: "2024-03-08",
        experience: "3 years",
        education: "bachelors_information_science",
        status: "shortlisted",
        expectedSalary: 42000,
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
        gender: "male",
      },
    ],
    totalPages: 8,
    page: currentPage,
    setPage: setCurrentPage,
  };

  const applicantsArchitecture = [
    {
      header: "Applicant Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.fullName}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
              {item.fullName}
              <GenderIcon gender={item.gender} />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {item.email}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              {item.phone}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Position",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Briefcase className="w-4 h-4 mr-1 text-blue-500" />
            {fromSnakeCase(item.position)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.department)} Dept.
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
            {item.expectedSalary}/year
          </div>
        </div>
      ),
    },
    {
      header: "Qualifications",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Award className="w-4 h-4 mr-1 text-purple-500" />
            {item.experience}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.education)}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Applied: {item.applicationDate}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "shortlisted"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
              : item.status === "under_review"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
              : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
          }`}
        >
          {item.status === "shortlisted" ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <Clock className="w-3 h-3 mr-1" />
          )}
          {fromSnakeCase(item.status)}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => setModal({ type: "view", id: item.id })}
          onEdit={() => setModal({ type: "edit", id: item.id })}
          onDelete={() => setModal({ type: "delete", id: item.id })}
        >
          <button
            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-all duration-200"
            onClick={() => setModal({ type: "interview", id: item.id })}
            type="button"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </Actions>
      ),
    },
  ];

  // Issued Books Table
  const issuedBooksData = {
    data: [
      {
        id: 1,
        bookTitle: "JavaScript: The Good Parts",
        bookAuthor: "Douglas Crockford",
        isbn: "978-0596517748",
        memberName: "Alice Williams",
        memberEmail: "alice.williams@university.edu",
        membershipId: "LIB2024015",
        issueDate: "2024-03-01",
        dueDate: "2024-03-15",
        status: "overdue",
        daysOverdue: 5,
        renewalCount: 1,
        fineAmount: 2.5,
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
      },
      {
        id: 2,
        bookTitle: "Design Patterns: Elements",
        bookAuthor: "Gang of Four",
        isbn: "978-0201633612",
        memberName: "Bob Smith",
        memberEmail: "bob.smith@university.edu",
        membershipId: "LIB2024032",
        issueDate: "2024-03-10",
        dueDate: "2024-03-24",
        status: "active",
        daysOverdue: 0,
        renewalCount: 0,
        fineAmount: 0,
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
      },
    ],
    totalPages: 12,
    page: currentPage,
    setPage: setCurrentPage,
  };

  const issuedBooksArchitecture = [
    {
      header: "Book Info",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Book className="w-4 h-4 mr-1 text-blue-500" />
            {item.bookTitle}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            by {item.bookAuthor}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            ISBN: {item.isbn}
          </div>
        </div>
      ),
    },
    {
      header: "Member Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.memberName}
            className="size-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {item.memberName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.membershipId}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Issue Details",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-900 dark:text-white flex items-center">
            <CalendarDays className="w-4 h-4 mr-1 text-green-500" />
            {item.issueDate}
          </div>
          <div
            className={`text-sm flex items-center ${
              item.status === "overdue"
                ? "text-red-600 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Clock className="w-4 h-4 mr-1" />
            Due: {item.dueDate}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Renewed: {item.renewalCount} times
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <div className="space-y-1">
          <span
            className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
            }`}
          >
            {item.status === "active" ? (
              <CheckCircle className="w-3 h-3 mr-1" />
            ) : (
              <AlertCircle className="w-3 h-3 mr-1" />
            )}
            {item.status}
          </span>
          {item.status === "overdue" && (
            <div className="text-xs text-red-600 dark:text-red-400 font-medium">
              {item.daysOverdue} days overdue
            </div>
          )}
          <div
            className={`text-xs font-medium ${
              item.fineAmount > 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            Fine: {item.fineAmount}
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => setModal({ type: "view", id: item.id })}
          onEdit={() => setModal({ type: "renew", id: item.id })}
          onDelete={() => setModal({ type: "return", id: item.id })}
        >
          <button
            className="p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-lg transition-all duration-200"
            onClick={() => setModal({ type: "remind", id: item.id })}
            type="button"
          >
            <Mail className="w-4 h-4" />
          </button>
        </Actions>
      ),
    },
  ];

  // Returned Books Table
  const returnedBooksData = {
    data: [
      {
        id: 1,
        bookTitle: "React in Action",
        bookAuthor: "Mark Tielens Thomas",
        isbn: "978-1617293856",
        memberName: "Carol Davis",
        memberEmail: "carol.davis@university.edu",
        membershipId: "LIB2024045",
        issueDate: "2024-02-28",
        returnDate: "2024-03-12",
        dueDate: "2024-03-14",
        condition: "good",
        fine: 0,
        borrowDuration: 13,
        isLate: false,
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
      },
      {
        id: 2,
        bookTitle: "Node.js Design Patterns",
        bookAuthor: "Mario Casciaro",
        isbn: "978-1785885587",
        memberName: "David Brown",
        memberEmail: "david.brown@university.edu",
        membershipId: "LIB2024067",
        issueDate: "2024-02-22",
        returnDate: "2024-03-11",
        dueDate: "2024-03-08",
        condition: "fair",
        fine: 5.5,
        borrowDuration: 18,
        isLate: true,
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
      },
    ],
    totalPages: 20,
    page: currentPage,
    setPage: setCurrentPage,
  };

  const returnedBooksArchitecture = [
    {
      header: "Book Info",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Book className="w-4 h-4 mr-1 text-green-500" />
            {item.bookTitle}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            by {item.bookAuthor}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            ISBN: {item.isbn}
          </div>
        </div>
      ),
    },
    {
      header: "Member Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.memberName}
            className="size-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {item.memberName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.membershipId}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Return Details",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-900 dark:text-white flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
            {item.returnDate}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Borrowed: {item.borrowDuration} days
          </div>
          <div
            className={`text-xs ${
              item.isLate
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {item.isLate ? "Returned Late" : "On Time"}
          </div>
        </div>
      ),
    },
    {
      header: "Condition & Fine",
      render: (item) => (
        <div className="space-y-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.condition === "good"
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                : item.condition === "fair"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
            }`}
          >
            {fromSnakeCase(item.condition)}
          </span>
          <div
            className={`text-sm font-medium flex items-center ${
              item.fine > 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            <DollarSign className="w-4 h-4 mr-1" />
            {item.fine}
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => setModal({ type: "view", id: item.id })}
          onEdit={() => setModal({ type: "edit", id: item.id })}
          onDelete={() => setModal({ type: "delete", id: item.id })}
        >
          <button
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200"
            onClick={() => setModal({ type: "receipt", id: item.id })}
            type="button"
          >
            <FileText className="w-4 h-4" />
          </button>
        </Actions>
      ),
    },
  ];

  // Staff Table
  const staffData = {
    data: [
      {
        id: 1,
        fullName: "Dr. Lisa Anderson",
        email: "l.anderson@library.com",
        phone: "+1 (555) 123-4567",
        role: "head_librarian",
        department: "administration",
        employeeId: "EMP2024001",
        joinDate: "2020-08-15",
        salary: 85000,
        status: "active",
        workSchedule: "full_time",
        specialization: "digital_archives",
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
        gender: "female",
      },
      {
        id: 2,
        fullName: "Mark Johnson",
        email: "m.johnson@library.com",
        phone: "+1 (555) 987-6543",
        role: "digital_resources_manager",
        department: "it_services",
        employeeId: "EMP2024002",
        joinDate: "2021-03-22",
        salary: 72000,
        status: "active",
        workSchedule: "full_time",
        specialization: "database_management",
        photo: "/profile/8c4dc09319b64ad48e596c12e8dc3c82.jpg",
        gender: "male",
      },
    ],
    totalPages: 6,
    page: currentPage,
    setPage: setCurrentPage,
  };

  const staffArchitecture = [
    {
      header: "Staff Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.fullName}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
              {item.fullName}
              <GenderIcon gender={item.gender} />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {item.email}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {item.employeeId}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Role & Department",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Shield className="w-4 h-4 mr-1 text-purple-500" />
            {fromSnakeCase(item.role)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.department)}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            {fromSnakeCase(item.specialization)}
          </div>
        </div>
      ),
    },
    {
      header: "Employment",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            {item.salary}/year
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.workSchedule)}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Since: {item.joinDate}
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            {item.phone}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
          }`}
        >
          {item.status === "active" ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <XCircle className="w-3 h-3 mr-1" />
          )}
          {item.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => setModal({ type: "view", id: item.id })}
          onEdit={() => setModal({ type: "edit", id: item.id })}
          onDelete={() => setModal({ type: "delete", id: item.id })}
        >
          <button
            className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-all duration-200"
            onClick={() => setModal({ type: "schedule", id: item.id })}
            type="button"
          >
            <Calendar className="w-4 h-4" />
          </button>
        </Actions>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Library Management Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive library data management system
            </p>
          </div>
          {/* <DarkModeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} /> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Members Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Library Members
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Manage student and faculty memberships
            </p>
          </div>
          <Table data={membersData} architecture={membersArchitecture} />
        </div>

        {/* Books Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Book className="w-5 h-5 mr-2 text-green-500" />
              Books Catalog
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Complete library book collection and inventory
            </p>
          </div>
          <Table data={booksData} architecture={booksArchitecture} />
        </div>

        {/* Applicants Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-500" />
              Job Applicants
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Review and manage employment applications
            </p>
          </div>
          <Table data={applicantsData} architecture={applicantsArchitecture} />
        </div>

        {/* Issued Books Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-500" />
              Issued Books
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Track currently borrowed books and due dates
            </p>
          </div>
          <Table
            data={issuedBooksData}
            architecture={issuedBooksArchitecture}
          />
        </div>

        {/* Returned Books Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-teal-500" />
              Returned Books
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              History of returned books and fine records
            </p>
          </div>
          <Table
            data={returnedBooksData}
            architecture={returnedBooksArchitecture}
          />
        </div>

        {/* Staff Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-indigo-500" />
              Library Staff
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Employee directory and role management
            </p>
          </div>
          <Table data={staffData} architecture={staffArchitecture} />
        </div>
      </div>
    </div>
  );
};

export default TableExamples;
