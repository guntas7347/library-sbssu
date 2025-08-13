const AboutPage = () => {
  return (
    <div className="px-2 md:px-10 py-5 flex flex-col gap-5 overflow-hidden c-about">
      <h1 className="text-4xl font-black">About us</h1>
      <div>
        <p>
          Progress in this information age depends largely on front-line
          knowledge/information gained by educationists, technologists,
          engineers and scientists, and the library plays a key role in
          dissemination of information. The flood of literature, shrinking
          resources, and escalation of prices has made it impossible to get all
          information at the individual level. So, at this stage, the library
          comes to the rescue of its users.
        </p>
        <p>
          The Central Library of the Technical Campus has an adequate number of
          books to meet the present requirements of the students and staff in
          the subjects and fields of the ongoing courses. Around 35,000 books
          and reference books have been procured in various streams of Science,
          Engineering, Management, and Humanities.
        </p>
        <p>
          For topical awakening of students and staff, it subscribes to 11 local
          and national newspapers, 35 periodicals of national and international
          standard, and 45 journals of national standard covering three
          languages: English, Hindi, and Punjabi. It also subscribes to 500
          ScienceDirect e-journals. The library is procuring books on a regular
          basis and holds book displays at regular intervals.
        </p>
        <p className="font-semibold">
          Following are a few worth-mentioning plus points of SBSSU Central
          Library:
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li>
              Library is a member of DELNET (Developing Library Networks).
            </li>
            <li>
              The library has various sections, i.e., Reference Section, Text
              Book Section, Book Bank Section, Circulation Section, Technical
              Section, Periodical Section including Magazines, Journals,
              Periodicals, Newspapers, Newsletters, CD-ROM facility.
            </li>
            <li>There is a Book Bank facility for SC/ST students.</li>
            <li>An air-conditioned Reading Hall.</li>
          </ul>
        </p>
      </div>
      <h1 className="text-2xl font-black">Central Library Information</h1>
      <p>
        <strong>Library Timings:</strong> 9:00 AM to 7:00 PM
      </p>
      <div>
        <h2 className="text-xl font-semibold">Available Resources</h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>Books, Text Books, General Books and Reference Books</li>
          <li>Journals/e-journals</li>
          <li>Standards/Manuals/Thesis</li>
          <li>CDs/DVDs</li>
          <li>Publishers Catalogue/Product Catalogue</li>
          <li>Institute Publications & Faculty Research Papers</li>
          <li>Syllabi / Old Question Papers</li>
          <li>News Letters/Newspapers</li>
        </ul>
      </div>
      <div className="relative overflow-auto">
        <h2 className="text-xl font-semibold">Books and Other Resources</h2>
        <table>
          <tr>
            <th>Sr. No.</th>
            <th>Resource</th>
            <th>Quantity</th>
          </tr>
          <tr>
            <td>1</td>
            <td>No of Books/Volumes</td>
            <td>35,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>No. Of Titles</td>
            <td>13,500</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Printed International/National Journals</td>
            <td>54</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Printed Magazines</td>
            <td>25</td>
          </tr>
          <tr>
            <td>5</td>
            <td>E-journals</td>
            <td>447 journals across 3 resources</td>
          </tr>
          <tr>
            <td>6</td>
            <td>E-Books</td>
            <td>Approx. 1.3 lacs</td>
          </tr>
          <tr>
            <td>7</td>
            <td>DELNET Membership</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Newspapers</td>
            <td>11</td>
          </tr>
        </table>
      </div>
      <div className="relative overflow-x-auto">
        <h2 className="text-xl font-semibold">E-Resources</h2>
        <table>
          <tr>
            <th>Sr. No.</th>
            <th>Name of the Publisher</th>
            <th>Website Address</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Science Direct</td>
            <td>
              <a href="https://sciencedirect.com/science/journals/a/full-text-access">
                Science Direct
              </a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>IEEE Xplore</td>
            <td>
              <a href="http://ieeexplore.ieee.org/xpl/periodicals.jsp">
                IEEE Xplore
              </a>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>ASME Digital Collection</td>
            <td>
              <a href="http://asmedigitalcollection.asme.org/journals.aspx">
                ASME
              </a>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Ebooks (EBSCO)</td>
            <td>
              <a href="http://search.ebscohost.com">EBSCOhost</a>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Facilities</h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>Air-conditioned Reading Hall</li>
          <li>Library Reading Hall</li>
          <li>E-lab with Internet Connectivity</li>
          <li>Book Bank</li>
          <li>Journals/Periodicals of International/National Standard</li>
          <li>Reprographic with Network Facilities</li>
        </ul>
      </div>
      <div className="relative overflow-x-auto">
        <h2 className="text-xl font-semibold">Library Membership</h2>{" "}
        <table>
          <tr>
            <th>Category</th>
            <th>No. of Tickets</th>
          </tr>
          <tr>
            <td>Teaching Faculty</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Non-Teaching</td>
            <td>2</td>
          </tr>
          <tr>
            <td>U.G. Students</td>
            <td>2</td>
          </tr>
          <tr>
            <td>P.G. Students</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Special Members</td>
            <td>1</td>
          </tr>
        </table>
      </div>
      <div className="relative overflow-x-auto">
        <h2 className="text-xl font-semibold">Loan Period</h2>
        <table>
          <tr>
            <th>Item</th>
            <th>Loan Period</th>
          </tr>
          <tr>
            <td>General/Text Books</td>
            <td>14 days</td>
          </tr>
          <tr>
            <td>Overnight/Ref. Text Books</td>
            <td>1 day</td>
          </tr>
          <tr>
            <td>Book Bank Books</td>
            <td>Full semester</td>
          </tr>
          <tr>
            <td>Faculty (Text Books)</td>
            <td>Full semester</td>
          </tr>
          <tr>
            <td>Current Journals/Periodicals</td>
            <td>Not to be issued</td>
          </tr>
          <tr>
            <td>Bound Journals/Periodicals</td>
            <td>Overnight</td>
          </tr>
          <tr>
            <td>Thesis, Non-book and CD-ROMs</td>
            <td>Not to be issued</td>
          </tr>
          <tr>
            <td>Reference Books</td>
            <td>Not to be issued</td>
          </tr>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Library Services</h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>Orientation of Library</li>
          <li>Circulation of Books</li>
          <li>Reference Service</li>
          <li>Access to Journals/E-journals and E-books</li>
          <li>Reprographic Service</li>
          <li>CAS (Current Awareness Service)</li>
          <li>SDI (Selective Dissemination Information Service)</li>
          <li>Inter-library Loan (On Demand)</li>
          <li>Newspaper Clipping</li>
          <li>Conference/Seminar Information</li>
        </ul>
      </div>
      <div className="relative overflow-x-auto">
        <h2 className="text-xl font-semibold">Library Staff</h2>
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Qualification</th>
              <th>Contact No</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Tej Pal Verma</td>
              <td>Librarian</td>
              <td>MSc., MLIS, PGDCA</td>
              <td>8288012004</td>
              <td>tej2266@gmail.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Shabnam</td>
              <td>Library Assistant</td>
              <td>B.A, B.LIS., MLiS</td>
              <td>9872140545</td>
              <td>shabnam.Library@gmail.com</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Sukhwinder Kaur</td>
              <td>Library Assistant</td>
              <td>B.A, B.LIS., MLiS</td>
              <td>78373997761</td>
              <td>suhwinderkaur78@gmail.com</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Komalpreet Kaur</td>
              <td>Library Assistant</td>
              <td>B.A., B.LiS., M.LiS</td>
              <td>9876560609</td>
              <td>komal1991.preet@gmail.com</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Sarnjeet Kaur</td>
              <td>Library Assistant</td>
              <td>B.A, B.LiS</td>
              <td>8699626487</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Raman</td>
              <td>Lab Attendant</td>
              <td>10+2</td>
              <td>8872214626</td>
              <td>bharaman04@gmail.com</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Sukha Singh</td>
              <td>Peon</td>
              <td>10th</td>
              <td>8283907010</td>
              <td>sukh83in@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutPage;
