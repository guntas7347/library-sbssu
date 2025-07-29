import React from "react";
import {
  BookOpen,
  Clock,
  Users,
  Globe,
  Database,
  Wifi,
  Calendar,
  Search,
  Mail,
  Phone,
  Award,
  Building,
  Newspaper,
  FileText,
  Monitor,
  CreditCard,
  RefreshCw,
  Settings,
} from "lucide-react";
import Navbar from "../../components/features/public/navbar/Navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* About Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center">
                <Building className="w-8 h-8 text-blue-600 mr-3" />
                About Us
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Progress in this information age depends largely on front-line
                  knowledge/information gained by educationists, technologists,
                  engineers and scientists, and the library plays a key role in
                  dissemination of information. The flood of literature,
                  shrinking resources, and escalation of prices has made it
                  impossible to get all information at the individual level. So,
                  at this stage, the library comes to the rescue of its users.
                </p>
                <p>
                  The Central Library of the Technical Campus has an adequate
                  number of books to meet the present requirements of the
                  students and staff in the subjects and fields of the ongoing
                  courses. Around{" "}
                  <span className="font-bold text-blue-600">35,000 books</span>{" "}
                  and reference books have been procured in various streams of
                  Science, Engineering, Management, and Humanities.
                </p>
                <p>
                  For topical awakening of students and staff, it subscribes to{" "}
                  <span className="font-bold text-blue-600">
                    11 local and national newspapers
                  </span>
                  ,{" "}
                  <span className="font-bold text-blue-600">
                    35 periodicals
                  </span>{" "}
                  of national and international standard, and{" "}
                  <span className="font-bold text-blue-600">45 journals</span>{" "}
                  of national standard covering three languages: English, Hindi,
                  and Punjabi. It also subscribes to{" "}
                  <span className="font-bold text-blue-600">
                    500 ScienceDirect e-journals
                  </span>
                  . The library is procuring books on a regular basis and holds
                  book displays at regular intervals.
                </p>

                <div className="bg-blue-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Key Highlights
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>
                        Member of DELNET (Developing Library Networks)
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>
                        Multiple specialized sections for different resources
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Book Bank facility for SC/ST students</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Monitor className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Air-conditioned Reading Hall</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Info Cards */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Library Hours
                  </h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  9:00 AM - 7:00 PM
                </p>
                <p className="text-gray-600">Monday to Friday</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Total Books
                  </h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">35,000+</p>
                <p className="text-gray-600">Volumes across all subjects</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    E-Resources
                  </h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">500+</p>
                <p className="text-gray-600">E-journals & databases</p>
              </div>
            </div>
          </section>

          {/* Available Resources */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Database className="w-8 h-8 text-blue-600 mr-3" />
                Available Resources
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: BookOpen,
                    text: "Books, Text Books, General Books and Reference Books",
                  },
                  { icon: FileText, text: "Journals/e-journals" },
                  { icon: Award, text: "Standards/Manuals/Thesis" },
                  { icon: Monitor, text: "CDs/DVDs" },
                  {
                    icon: FileText,
                    text: "Publishers Catalogue/Product Catalogue",
                  },
                  {
                    icon: Search,
                    text: "Institute Publications & Faculty Research Papers",
                  },
                  { icon: Calendar, text: "Syllabi / Old Question Papers" },
                  { icon: Newspaper, text: "News Letters/Newspapers" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Books and Resources Table */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 pb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                  Books and Other Resources
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Sr. No.
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Resource
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        no: 1,
                        resource: "No of Books/Volumes",
                        quantity: "35,000",
                      },
                      { no: 2, resource: "No. Of Titles", quantity: "13,500" },
                      {
                        no: 3,
                        resource: "Printed International/National Journals",
                        quantity: "54",
                      },
                      { no: 4, resource: "Printed Magazines", quantity: "25" },
                      {
                        no: 5,
                        resource: "E-journals",
                        quantity: "447 journals across 3 resources",
                      },
                      {
                        no: 6,
                        resource: "E-Books",
                        quantity: "Approx. 1.3 lacs",
                      },
                      { no: 7, resource: "DELNET Membership", quantity: "Yes" },
                      { no: 8, resource: "Newspapers", quantity: "11" },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {row.no}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {row.resource}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600 font-semibold">
                          {row.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* E-Resources */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 pb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Globe className="w-8 h-8 text-blue-600 mr-3" />
                  E-Resources
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Sr. No.
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Name of the Publisher
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Website Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        no: 1,
                        publisher: "Science Direct",
                        url: "https://sciencedirect.com/science/journals/a/full-text-access",
                        text: "Science Direct",
                      },
                      {
                        no: 2,
                        publisher: "IEEE Xplore",
                        url: "http://ieeexplore.ieee.org/xpl/periodicals.jsp",
                        text: "IEEE Xplore",
                      },
                      {
                        no: 3,
                        publisher: "ASME Digital Collection",
                        url: "http://asmedigitalcollection.asme.org/journals.aspx",
                        text: "ASME",
                      },
                      {
                        no: 4,
                        publisher: "Ebooks (EBSCO)",
                        url: "http://search.ebscohost.com",
                        text: "EBSCOhost",
                      },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {row.no}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {row.publisher}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <a
                            href={row.url}
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                          >
                            {row.text}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Facilities */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Settings className="w-8 h-8 text-blue-600 mr-3" />
                Facilities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Monitor, text: "Air-conditioned Reading Hall" },
                  { icon: BookOpen, text: "Library Reading Hall" },
                  { icon: Wifi, text: "E-lab with Internet Connectivity" },
                  { icon: CreditCard, text: "Book Bank" },
                  {
                    icon: FileText,
                    text: "Journals/Periodicals of International/National Standard",
                  },
                  {
                    icon: RefreshCw,
                    text: "Reprographic with Network Facilities",
                  },
                ].map((facility, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                  >
                    <facility.icon className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-700">{facility.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Library Membership & Loan Period */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 pb-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="w-6 h-6 text-blue-600 mr-3" />
                    Library Membership
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          No. of Tickets
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { category: "Teaching Faculty", tickets: "10" },
                        { category: "Non-Teaching", tickets: "2" },
                        { category: "U.G. Students", tickets: "2" },
                        { category: "P.G. Students", tickets: "3" },
                        { category: "Special Members", tickets: "1" },
                      ].map((row, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {row.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-semibold">
                            {row.tickets}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 pb-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 text-blue-600 mr-3" />
                    Loan Period
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Item
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Loan Period
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { item: "General/Text Books", period: "14 days" },
                        { item: "Overnight/Ref. Text Books", period: "1 day" },
                        { item: "Book Bank Books", period: "Full semester" },
                        {
                          item: "Faculty (Text Books)",
                          period: "Full semester",
                        },
                        {
                          item: "Current Journals/Periodicals",
                          period: "Not to be issued",
                        },
                        {
                          item: "Bound Journals/Periodicals",
                          period: "Overnight",
                        },
                        {
                          item: "Thesis, Non-book and CD-ROMs",
                          period: "Not to be issued",
                        },
                        { item: "Reference Books", period: "Not to be issued" },
                      ].map((row, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {row.item}
                          </td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-semibold">
                            {row.period}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Library Services */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Search className="w-8 h-8 text-blue-600 mr-3" />
                Library Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Orientation of Library",
                  "Circulation of Books",
                  "Reference Service",
                  "Access to Journals/E-journals and E-books",
                  "Reprographic Service",
                  "CAS (Current Awareness Service)",
                  "SDI (Selective Dissemination Information Service)",
                  "Inter-library Loan (On Demand)",
                  "Newspaper Clipping",
                  "Conference/Seminar Information",
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Library Staff */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 pb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Users className="w-8 h-8 text-blue-600 mr-3" />
                  Library Staff
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Sr. No
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Designation
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Qualification
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        no: 1,
                        name: "Tej Pal Verma",
                        designation: "Librarian",
                        qualification: "MSc., MLIS, PGDCA",
                        contact: "8288012004",
                        email: "tej2266@gmail.com",
                      },
                      {
                        no: 2,
                        name: "Shabnam",
                        designation: "Library Assistant",
                        qualification: "B.A, B.LIS., MLiS",
                        contact: "9872140545",
                        email: "shabnam.Library@gmail.com",
                      },
                      {
                        no: 3,
                        name: "Sukhwinder Kaur",
                        designation: "Library Assistant",
                        qualification: "B.A, B.LIS., MLiS",
                        contact: "78373997761",
                        email: "suhwinderkaur78@gmail.com",
                      },
                      {
                        no: 4,
                        name: "Komalpreet Kaur",
                        designation: "Library Assistant",
                        qualification: "B.A., B.LiS., M.LiS",
                        contact: "9876560609",
                        email: "komal1991.preet@gmail.com",
                      },
                      {
                        no: 5,
                        name: "Sarnjeet Kaur",
                        designation: "Library Assistant",
                        qualification: "B.A, B.LiS",
                        contact: "8699626487",
                        email: "N/A",
                      },
                      {
                        no: 6,
                        name: "Raman",
                        designation: "Lab Attendant",
                        qualification: "10+2",
                        contact: "8872214626",
                        email: "bharaman04@gmail.com",
                      },
                      {
                        no: 7,
                        name: "Sukha Singh",
                        designation: "Peon",
                        qualification: "10th",
                        contact: "8283907010",
                        email: "sukh83in@gmail.com",
                      },
                    ].map((staff, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {staff.no}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                          {staff.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600">
                          {staff.designation}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {staff.qualification}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{staff.contact}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{staff.email}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
