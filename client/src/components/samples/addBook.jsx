import React, { useState } from "react";
import {
  ArrowLeft,
  BookPlus,
  Upload,
  Plus,
  Trash2,
  Save,
  Scan,
  AlertCircle,
  CheckCircle,
  Book,
  Hash,
  User,
  Calendar,
  DollarSign,
  MapPin,
  Tag,
  FileText,
} from "lucide-react";

export default function AddBookPage() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    isbn13: "",
    publisher: "",
    publishedDate: "",
    edition: "",
    pages: "",
    language: "English",
    category: "",
    subcategory: "",
    description: "",
    price: "",
    location: "",
    shelf: "",
    condition: "New",
    tags: [],
  });

  const [bookIds, setBookIds] = useState([
    { id: "", barcode: "", condition: "New" },
  ]);
  const [coverImage, setCoverImage] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Computer Science",
    "Engineering",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Business",
    "Economics",
    "Literature",
    "History",
    "Philosophy",
    "Psychology",
    "Art",
    "Music",
    "Other",
  ];

  const conditions = ["New", "Good", "Fair", "Poor"];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Other",
  ];

  const handleInputChange = (field, value) => {
    setBookData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleBookIdChange = (index, field, value) => {
    const updatedIds = [...bookIds];
    updatedIds[index][field] = value;
    setBookIds(updatedIds);
  };

  const addBookId = () => {
    setBookIds((prev) => [...prev, { id: "", barcode: "", condition: "New" }]);
  };

  const removeBookId = (index) => {
    if (bookIds.length > 1) {
      setBookIds((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !bookData.tags.includes(newTag.trim())) {
      setBookData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setBookData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!bookData.title.trim()) newErrors.title = "Title is required";
    if (!bookData.author.trim()) newErrors.author = "Author is required";
    if (!bookData.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!bookData.category) newErrors.category = "Category is required";
    if (!bookData.location.trim()) newErrors.location = "Location is required";

    // Validate book IDs
    const invalidIds = bookIds.some((book) => !book.id.trim());
    if (invalidIds) newErrors.bookIds = "All book IDs must be filled";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const bookPayload = {
        ...bookData,
        bookIds: bookIds,
        coverImage: coverImage,
        totalCopies: bookIds.length,
        availableCopies: bookIds.length,
        addedDate: new Date().toISOString().split("T")[0],
      };

      console.log("Book data to submit:", bookPayload);
      alert(
        `Book "${bookData.title}" added successfully with ${bookIds.length} copies!`
      );

      // Reset form
      setBookData({
        title: "",
        author: "",
        isbn: "",
        isbn13: "",
        publisher: "",
        publishedDate: "",
        edition: "",
        pages: "",
        language: "English",
        category: "",
        subcategory: "",
        description: "",
        price: "",
        location: "",
        shelf: "",
        condition: "New",
        tags: [],
      });
      setBookIds([{ id: "", barcode: "", condition: "New" }]);
      setCoverImage(null);
    } catch (error) {
      alert("Error adding book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 rounded-xl flex items-center justify-center">
                  <BookPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                    Add New Book
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Add books to library inventory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={bookData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.title
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter book title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={bookData.author}
                      onChange={(e) =>
                        handleInputChange("author", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.author
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter author name"
                    />
                    {errors.author && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.author}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ISBN *
                    </label>
                    <input
                      type="text"
                      value={bookData.isbn}
                      onChange={(e) =>
                        handleInputChange("isbn", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.isbn
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter ISBN"
                    />
                    {errors.isbn && (
                      <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ISBN-13
                    </label>
                    <input
                      type="text"
                      value={bookData.isbn13}
                      onChange={(e) =>
                        handleInputChange("isbn13", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter ISBN-13"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Publisher
                    </label>
                    <input
                      type="text"
                      value={bookData.publisher}
                      onChange={(e) =>
                        handleInputChange("publisher", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter publisher"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Published Date
                    </label>
                    <input
                      type="date"
                      value={bookData.publishedDate}
                      onChange={(e) =>
                        handleInputChange("publishedDate", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Edition
                    </label>
                    <input
                      type="text"
                      value={bookData.edition}
                      onChange={(e) =>
                        handleInputChange("edition", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 1st Edition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pages
                    </label>
                    <input
                      type="number"
                      value={bookData.pages}
                      onChange={(e) =>
                        handleInputChange("pages", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Number of pages"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={bookData.language}
                      onChange={(e) =>
                        handleInputChange("language", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={bookData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.category
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={bookData.subcategory}
                      onChange={(e) =>
                        handleInputChange("subcategory", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter subcategory"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={bookData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                        placeholder="0.00"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={bookData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter book description"
                  />
                </div>
              </div>

              {/* Location & Physical Details */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                  Location & Physical Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={bookData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.location
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                      placeholder="e.g., CS-A-101"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Shelf
                    </label>
                    <input
                      type="text"
                      value={bookData.shelf}
                      onChange={(e) =>
                        handleInputChange("shelf", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., A-15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Condition
                    </label>
                    <select
                      value={bookData.condition}
                      onChange={(e) =>
                        handleInputChange("condition", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    >
                      {conditions.map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
                  Tags
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bookData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Book IDs */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Hash className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Book IDs & Copies
                  </h3>
                  <button
                    type="button"
                    onClick={addBookId}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Copy</span>
                  </button>
                </div>

                {errors.bookIds && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        {errors.bookIds}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {bookIds.map((book, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Book ID *
                          </label>
                          <input
                            type="text"
                            value={book.id}
                            onChange={(e) =>
                              handleBookIdChange(index, "id", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            placeholder="Enter unique book ID"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Barcode
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={book.barcode}
                              onChange={(e) =>
                                handleBookIdChange(
                                  index,
                                  "barcode",
                                  e.target.value
                                )
                              }
                              className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                              placeholder="Scan or enter barcode"
                            />
                            <Scan className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Condition
                          </label>
                          <select
                            value={book.condition}
                            onChange={(e) =>
                              handleBookIdChange(
                                index,
                                "condition",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                          >
                            {conditions.map((condition) => (
                              <option key={condition} value={condition}>
                                {condition}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {bookIds.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBookId(index)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Cover Image */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Cover Image
                </h3>
                <div className="text-center">
                  {coverImage ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt="Book cover"
                        className="w-full h-64 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverImage(null)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Upload book cover
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        className="hidden"
                        id="cover-upload"
                      />
                      <label
                        htmlFor="cover-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Copies
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {bookIds.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Available
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {bookIds.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Category
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {bookData.category || "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Language
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {bookData.language}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white rounded-2xl hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Book...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Add Book</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
